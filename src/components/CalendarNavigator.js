import React, { PureComponent } from 'react';
import moment from 'moment';
import styled from 'styled-components';

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

        if(!from.isSame(to, 'year')) {
            return `${from.format('DD MMM YYYY')} - ${to.format('DD MMM YYYY')}`;
        }

        if(!from.isSame(to, 'month')) {
            return `${from.format('DD MMM')} - ${to.format('DD MMM YYYY')}`;
        }

        return `${from.format('DD')} - ${to.format('DD MMM YYYY')}`;
    }

    prev() {
        const to = moment(this.props.period.from);
        const from = to.clone().subtract(this.props.daysQuantity, 'days');
        const period = { from, to };
        this.props.onPeriodChange(period);
        return period;
    }

    next() {
        const from = moment(this.props.period.to);
        const to = from.clone().add(this.props.daysQuantity, 'days');
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