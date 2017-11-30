import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { HUMAN_DATE_FORMAT } from './constants';

const CalendarNavigatorStyled = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  float: right;
  button {
    outline: none;
    background: transparent;
    height: 40px;
    margin: 0 2px;
    width: 40px;
  }
  button:active, button:focus {
    border-color: #585858;
  }
`;

class CalendarNavigator extends PureComponent {
  constructor(props) {
    super(props);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  formatPeriodString() {
    const { from, to } = this.props.period;

    if (this.props.daysQuantity <= 1) {
      return `${from.format(HUMAN_DATE_FORMAT)}`;
    }

    if (!from.isSame(to, 'year')) {
      return `${from.format(HUMAN_DATE_FORMAT)} - ${to.format(HUMAN_DATE_FORMAT)}`;
    }

    if (!from.isSame(to, 'month')) {
      return `${from.format('DD MMM')} - ${to.format(HUMAN_DATE_FORMAT)}`;
    }

    return `${from.format('DD')} - ${to.format(HUMAN_DATE_FORMAT)}`;
  }

  prev() {
    const to = moment(this.props.period.from).subtract(1, 'days');
    const from = moment(to).subtract(this.props.daysQuantity - 1, 'days');
    const period = { from, to };
    this.props.onPeriodChange(period);
    return period;
  }

  next() {
    const from = moment(this.props.period.to).add(1, 'days');
    const to = moment(from).add(this.props.daysQuantity - 1, 'days');
    const period = { from, to };
    this.props.onPeriodChange(period);
    return period;
  }

  render() {
    return (
      <CalendarNavigatorStyled>
        <div className="calendar-navigator">
          <span className="calendar-navigation__date-range">{this.formatPeriodString()}</span>
          <button className="calendar-navigation__button" onClick={this.prev}>
            <svg width="8px" height="10px" viewBox="0 0 50 80">
              <polyline
                fill="none"
                stroke="#000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="45.63,75.8 0.375,38.087 45.63,0.375 "
              />
            </svg>
          </button>
          <button className="arrow right" onClick={this.next}>
            <svg width="8px" height="10px" viewBox="0 0 50 80">
              <polyline
                fill="none"
                stroke="#000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0.375,0.375 45.63,38.087 0.375,75.8 "
              />
            </svg>
          </button>
        </div>
      </CalendarNavigatorStyled>
    );
  }
}

CalendarNavigator.propTypes = {
  period: PropTypes.shape({
    from: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]),
    to: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]),
  }).isRequired,
  daysQuantity: PropTypes.number.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};

export default CalendarNavigator;
