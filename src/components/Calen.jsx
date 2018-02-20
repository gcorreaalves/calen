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
      daysQuantity: this.props.daysQuantity || 7,
    };
    this.setDaysQuantity = this.setDaysQuantity.bind(this);
    this.resetDaysQuantityOnResize = this.resetDaysQuantityOnResize.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayAddEventClick = this.handleDayAddEventClick.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.breakPoints = {
      sm: window.matchMedia('(min-width: 576px)'),
      md: window.matchMedia('(min-width: 768px)'),
      lg: window.matchMedia('(min-width: 992px)'),
      xl: window.matchMedia('(min-width: 1200px)'),
    };
  }

  componentDidMount() {
    try {
      require(`moment/locale/${this.props.locale}`);
    } catch (e) {
      if (this.props.locale !== 'en') {
        console.log(new Error('Locale not found'));
      }
    }
    this.setUpDaysQuantity();
  }

  componentWillUnmount() {
    this.removeBreakPointsEvents();
  }

  setPeriod(quantity) {
    const { date } = this.props;
    const period = {
      from: moment().startOf('isoWeek'),
      to: moment().startOf('isoWeek').add(quantity, 'days'),
    };
    if (this.state.period) {
      const { from } = this.state.period;
      period.from = from.startOf('isoWeek');
      period.to = from.clone().startOf('isoWeek').add(quantity, 'days');
    } else if (date) {
      period.from = moment(date).startOf('isoWeek');
      period.to = moment(date).startOf('isoWeek').add(quantity, 'days');
    }
    this.setState({ period });
    this.handlePeriodChange(period);
  }

  setUpDaysQuantity() {
    const quantity = this.props.daysQuantity;
    if (!quantity) {
      this.resetDaysQuantityOnResize();
    } else {
      this.setDaysQuantity(quantity);
    }
  }

  setDaysQuantity(quantity) {
    this.setState({ daysQuantity: quantity });
    const { onDaysQuantityChange } = this.props;
    if (onDaysQuantityChange) {
      onDaysQuantityChange(quantity);
    }
    this.setPeriod(quantity - 1);
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

  handleDayAddEventClick(day) {
    this.props.onDayAddEventClick(day);
  }

  handleDayClick(day) {
    this.setActiveDay(day);
  }

  handlePeriodChange(period) {
    const day = moment(this.props.date);
    const today = moment();
    const range = moment.range(period.from, period.to);
    let date = period.from.format(DEFAULT_DATE_FORMAT);
    if (range.contains(today)) {
      date = today.format(DEFAULT_DATE_FORMAT);
    }

    this.setState({ period });
    const { onPeriodChange } = this.props;
    if (onPeriodChange) {
      onPeriodChange(period);
    }

    if (range.contains(moment(day))) {
      date = moment(day).format(DEFAULT_DATE_FORMAT);
    }
    this.setActiveDay(date);
  }

  render() {
    if (!this.state.period) {
      return null;
    }
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
          onDayAddEventClick={this.props.onDayAddEventClick ? this.handleDayAddEventClick : null}
        />
      </div>
    );
  }
}

Calen.defaultProps = {
  date: moment(),
  locale: null,
  data: {},
  daysQuantity: 0,
  onDayChange: null,
  onDayAddEventClick: null,
  onPeriodChange: null,
  onDaysQuantityChange: null,
};

Calen.propTypes = {
  locale: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  data: PropTypes.object,
  daysQuantity: PropTypes.number,
  onDayChange: PropTypes.func,
  onDayAddEventClick: PropTypes.func,
  onPeriodChange: PropTypes.func,
  onDaysQuantityChange: PropTypes.func,
};

export default Calen;
