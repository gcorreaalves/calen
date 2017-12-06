import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentjs from 'moment';
import { extendMoment } from 'moment-range';
import { DEFAULT_DATE_FORMAT } from './constants';
import Calendar from './Calendar';
import CalendarNavigator from './CalendarNavigator';

const moment = extendMoment(momentjs);

class Calen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: moment().format(DEFAULT_DATE_FORMAT),
      period: this.props.period,
      daysQuantity: this.props.daysQuantity || 7,
    };
    this.setDaysQuantity = this.setDaysQuantity.bind(this);
    this.resetDaysQuantityOnResize = this.resetDaysQuantityOnResize.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.breakPoints = {
      sm: window.matchMedia('(min-width: 576px)'),
      md: window.matchMedia('(min-width: 768px)'),
      lg: window.matchMedia('(min-width: 992px)'),
      xl: window.matchMedia('(min-width: 1200px)'),
    };
  }

  componentDidMount() {
    this.setUpDaysQuantity(this.props.daysQuantity);
  }

  componentWillUnmount() {
    this.removeBreakPointsEvents();
  }

  setUpDaysQuantity(quantity) {
    if (!quantity) {
      this.resetDaysQuantityOnResize();
    } else {
      this.setDaysQuantity(quantity);
    }
  }

  setDaysQuantity(quantity) {
    this.setState({ daysQuantity: quantity });

    const period = {
      from: moment().startOf('week'),
      to: moment().startOf('week').add(quantity - 1, 'days'),
    };

    if (quantity < 7) {
      period.from = moment();
      period.to = moment().add(quantity - 1, 'days');
    }

    const { onDaysQuantityChange } = this.props;
    if (onDaysQuantityChange) {
      onDaysQuantityChange(quantity);
    }

    this.handlePeriodChange(period);
  }

  setActiveDay(day) {
    this.setState({ day });
    const { onDayChange } = this.props;
    if (onDayChange) {
      onDayChange(day);
    }
  }

  resetDaysQuantityOnResize() {
    const {
      xl,
      lg,
      md,
      sm,
    } = this.breakPoints;

    xl.addListener(this.resetDaysQuantityOnResize);
    lg.addListener(this.resetDaysQuantityOnResize);
    md.addListener(this.resetDaysQuantityOnResize);
    sm.addListener(this.resetDaysQuantityOnResize);

    let quantity = this.state.daysQuantity;
    if (xl.matches) {
      quantity = 7;
    } else if (lg.matches) {
      quantity = 5;
    } else if (md.matches) {
      quantity = 4;
    } else if (sm.matches) {
      quantity = 2;
    } else {
      quantity = 1;
    }
    this.setDaysQuantity(quantity);
  }

  removeBreakPointsEvents() {
    this.breakPoints.xl.removeListener(this.resetDaysQuantityOnResize);
    this.breakPoints.lg.removeListener(this.resetDaysQuantityOnResize);
    this.breakPoints.md.removeListener(this.resetDaysQuantityOnResize);
    this.breakPoints.sm.removeListener(this.resetDaysQuantityOnResize);
  }

  handleDayClick(day) {
    this.setActiveDay(day);
  }

  handlePeriodChange(period) {
    const today = moment();
    const range = moment.range(period.from, period.to);
    let date = period.from.format(DEFAULT_DATE_FORMAT);
    if (range.contains(today)) {
      date = today.format(DEFAULT_DATE_FORMAT);
    }
    this.setActiveDay(date);
    this.setState({ period });

    const { onPeriodChange } = this.props;
    if (onPeriodChange) {
      onPeriodChange(period);
    }
  }

  render() {
    return (
      <div>
        <CalendarNavigator
          period={this.state.period}
          daysQuantity={this.state.daysQuantity}
          onPeriodChange={this.handlePeriodChange}
        />
        <Calendar
          period={this.state.period}
          day={this.state.day}
          data={this.props.data}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

Calen.defaultProps = {
  period: {
    from: moment().startOf('week'),
    to: moment().startOf('week').add(6, 'days'),
  },
  data: {},
  daysQuantity: 0,
  onDayChange: null,
  onPeriodChange: null,
  onDaysQuantityChange: null,
};

Calen.propTypes = {
  period: PropTypes.shape({
    from: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]),
    to: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]),
  }),
  data: PropTypes.object,
  daysQuantity: PropTypes.number,
  onDayChange: PropTypes.func,
  onPeriodChange: PropTypes.func,
  onDaysQuantityChange: PropTypes.func,
};

export default Calen;
