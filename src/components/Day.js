import React from 'react';
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
    width: 100%;
  }
  .day-event-list {
    display: block;
    flex: 1;
    margin-top: 2px;
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

const Day = ({ date, events, actions, active }) => {
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

export default Day;
