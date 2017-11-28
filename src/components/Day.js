import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';

const DayStyled = styled.div`
  background: transparent;
  border: 1px solid #ccc;
  list-style: none;
  padding: 10px;
  width: 100%;
  .day-header {
    margin-bottom: 10px;
    .day-week-name {
      float:left;
    }
    .day-date {
      float:right;
    }
  }
  .day-header::after {
    content: '';
    clear: both;
    display: block;
  }
  ul {
    margin:0;
    padding:0;
  }
  li {
    list-style: none;
  }
  ${props => props.today && css`
    background: tomato;
    color: white;
  `}
  ${props => props.active && css`
    background: white;
    color: palevioletred;
  `}
`;

const Day = ({ date, events, actions, active }) => {
  const isToday = moment(date).isSame(new Date(), 'd');
  return (
    <DayStyled className="day" today={isToday} active={active}>
      <div className="day-header">
        <div className="day-week-name">
          { moment(date).format('dddd') }
        </div>
        <div className="day-date">
          { moment(date).format('DD-MM') }
        </div>
      </div>
      <div>
        <ul className="day-event-list">
          {events.map(event => <li key={event.id}>{event.name}</li>)}
        </ul>
      </div>
    </DayStyled>
  );
};

Day.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  active: PropTypes.bool,
}

export default Day;