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
    margin: 0;
    min-height: 180px;
    padding: 10px 0 0 0;
    width: 100%;

  }
  .calen-list-item {
    flex: 1;
    display:flex;
    margin: 4px;
    position: relative;
    width:100%;
    :first-child {
      margin-left: 0;
    }
    :last-child {
        margin-right: 0;
    }
    &__day {
      background: transparent;
      border: none;
      width: 100%;
      outline: none;
      cursor: pointer;
    }
    &:hover {
      .calen-list-item__new-event-button {
        opacity: 1;
        bottom: 30px;
        transition: all ease-in .22s;
      }
    }
  }
`;

const ButtonNewEvent = styled.button`
  background: #585858;
  border: 1px solid transparent;
  border-radius: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  margin-left: -15px;
  left: 50%;
  z-index: 2;
  opacity: 0;
  transition: all ease-in .22s;
  cursor: pointer;
  outline: none;

  &:hover {
    background: gray;
  }

  @media (max-width: 575px) {
    opacity: 1;
    bottom: 30px;
  }

  .icon {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 20px;
  }

  .icon--plus > path {
    fill: #fff;
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
    const btnAddEvent = (date) => {
      if (!this.props.onDayAddEventClick) {
        return null;
      }
      return (
        <ButtonNewEvent
          className="calen-list-item__new-event-button"
          onClick={() => this.props.onDayAddEventClick(date)}
        >
          <svg className="icon icon--plus" viewBox="0 0 5 5">
            <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
          </svg>
        </ButtonNewEvent>
      );
    };

    return (
      <CalendarStyled>
        <ul className="calen-list">
          {calendar.map(day => (
            <li
              className="calen-list-item"
              key={day.date}
            >
              <button
                className="calen-list-item__day"
                onClick={() => this.props.onDayClick(day.date)}
              >
                <Day {...day} active={this.props.day === day.date} />
              </button>
              { btnAddEvent(day.date) }
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
  onDayAddEventClick: PropTypes.func,
};

export default Calendar;
