import React, { PureComponent } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { HUMAN_DATE_FORMAT } from './constants';

const CalendarNavigatorStyled = styled.div`
    float: right;
    margin: 10px;
    button {
        background: transparent;
        height: 40px;
        margin: 0 2px;
        width: 40px;
    }
`;

class CalendarNavigator extends PureComponent {
    constructor(props) {
        super(props);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    formatPeriodString() {
        const {from, to} = this.props.period;

        if(this.props.daysQuantity <= 1) {
            return `${from.format(HUMAN_DATE_FORMAT)}`;
        }

        if(!from.isSame(to, 'year')) {
            return `${from.format(HUMAN_DATE_FORMAT)} - ${to.format(HUMAN_DATE_FORMAT)}`;
        }

        if(!from.isSame(to, 'month')) {
            return `${from.format('DD MMM')} - ${to.format(HUMAN_DATE_FORMAT)}`;
        }

        return `${from.format('DD')} - ${to.format(HUMAN_DATE_FORMAT)}`;
    }

    prev() {
        const to = moment(this.props.period.from).subtract(1, 'days');
        const from = moment(to).subtract(this.props.daysQuantity-1, 'days');
        const period = { from, to };
        this.props.onPeriodChange(period);
        return period;
    }

    next() {
        const from = moment(this.props.period.to).add(1, 'days');
        const to = moment(from).add(this.props.daysQuantity-1, 'days');
        const period = { from, to };
        this.props.onPeriodChange(period);
        return period;
    }

    render() {
        return (
            <CalendarNavigatorStyled>
                <div className="calendar-navigator">
                    {this.formatPeriodString()}
                    <button className="calendar-navigation__button" onClick={this.prev}>
                        Left
                    </button>
                    <button className="arrow right" onClick={this.next}>
                        Right
                    </button>
                </div>
            </CalendarNavigatorStyled>
        );
    }
}

export default CalendarNavigator;