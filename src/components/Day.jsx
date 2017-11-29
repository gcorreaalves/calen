import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';

const DayStyled = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: transparent;
  color: #585858;
  border: 1px solid #ccc;
  list-style: none;
  padding: 10px;
  width: 100%;
  .day-header {
    text-align: right;
    .day-week-name {
      font-size: 0.8em;
    }
    .day-date {
      font-size: 1.2em;
    }
  }
  .day-header::after {
    content: '';
    clear: both;
    display: block;
  }
  .day-event {
    // display: flex;
    min-height: 70px;
    width: 100%;

  }
  .day-event-list {
    display: block;
    flex: 1;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ${props => props.today && css`
    border-bottom: 1px solid tomato;
  `}
  ${props => props.active && css`
    background: #eee;
    color: palevioletred;
  `}
`;

const Day = ({ date, events, active }) => {
  const isToday = moment(date).isSame(new Date(), 'd');
  return (
    <DayStyled className="day" today={isToday} active={active}>
      <div className="day-header">
        <div className="day-date">
          {moment(date).format('MMM Do')}
        </div>
        <div className="day-week-name">
          {moment(date).format('dddd')}
        </div>
      </div>
      <div className="day-event">
        {events.map(event => <div className="day-event-list" key={event.id}>{event.name}</div>)}
      </div>
    </DayStyled>
  );
};

Day.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  active: PropTypes.bool,
};

export default Day;
