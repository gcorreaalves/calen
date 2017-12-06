import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import momentjs from 'moment';
import { extendMoment } from 'moment-range';
import { DEFAULT_DATE_FORMAT } from './constants';
import Day from './Day';

const moment = extendMoment(momentjs);
const CalendarStyled = styled.div`
  ul.calen-list {
    display: flex;
    flex-wrap: wrap;
    list-style:none;
    width: 100%;
    padding: 10px 0 0 0;
    margin: 0;
  }
  li.calen-list-item {
    margin: 4px;
    flex: 1;
    display:flex;
    width:100%;
    :first-child {
      margin-left: 0;
    }
    :last-child {
        margin-right: 0;
    }
    button {
      background: transparent;
      border: none;
      width: 100%;
      outline: none;
    }
  }
`;

class Calendar extends PureComponent {
  buildCalendar() {
    const { from, to } = this.props.period;
    const { data } = this.props;
    const range = moment.range(from, to);
    const days = Array.from(range.by('day'));
    return days.map((day) => {
      let obj = { events: [] };
      const date = day.format(DEFAULT_DATE_FORMAT);
      if (data.hasOwnProperty(date)) {
        obj = data[date];
      }
      obj.date = date;
      return obj;
    });
  }

  render() {
    const calendar = this.buildCalendar();
    return (
      <CalendarStyled>
        <ul className="calen-list">
          {calendar.map(day => (
            <li
              className="calen-list-item"
              key={day.date}
            >
              <button onClick={() => this.props.onDayClick(day.date)}>
                <Day {...day} active={this.props.day === day.date} />
              </button>
            </li>
          ))}
        </ul>
      </CalendarStyled>
    );
  }
}

Calendar.propTypes = {
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
  day: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

export default Calendar;
