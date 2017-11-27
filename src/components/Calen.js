import React, { PureComponent } from 'react';
import moment from 'moment';

import DaysContainer from './DaysContainer';
import CalendarNavigator from './CalendarNavigator';

class Calen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            period: {
                from: moment('2017-11-20'),
                to: moment('2017-11-26'),
            },
            days: [{
                date: '2017-11-20',
                events: [],
                tasks: [],
            }, {
                date: '2017-11-21',
                events: [],
                tasks: [],
            }, {
                date: '2017-11-22',
                events: [{
                    id: 1,
                    name: '12 Services',
                }],
                tasks: [],
                active: true,
            }, {
                date: '2017-11-23',
                events: [],
                tasks: [],
            }, {
                date: '2017-11-24',
                events: [],
                tasks: [],
            }, {
                date: '2017-11-25',
                events: [],
                tasks: [],
            }, {
                date: '2017-11-26',
                events: [],
                tasks: [],
            }],
            daysQuantity: 7,
        };
        this.setDaysQuantity = this.setDaysQuantity.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
    }

    componentDidMount() {
        this.setDaysQuantity();
    }

    componentWillUnmount() {
        // TODO: remove event listener
    }

    setDaysQuantity() {
        const sm = window.matchMedia("(min-width: 576px)");
        const md = window.matchMedia("(min-width: 768px)");
        const lg = window.matchMedia("(min-width: 992px)");
        const xl = window.matchMedia("(min-width: 1200px)");

        xl.addListener(this.setDaysQuantity);
        lg.addListener(this.setDaysQuantity);
        md.addListener(this.setDaysQuantity);
        sm.addListener(this.setDaysQuantity);

        if (xl.matches) {
            this.setState({ daysQuantity: 7 });
        } else if (lg.matches) {
            this.setState({ daysQuantity: 5 });
        } else if (md.matches) {
            this.setState({ daysQuantity: 4 });
        } else if (sm.matches) {
            this.setState({ daysQuantity: 2 });
        } else {
            this.setState({ daysQuantity: 1 });
        }
    }

    takeDaysQuantity() {
        const { days, period, daysQuantity } = this.state;
        const position = days.findIndex(day => day.date === period.from.format('YYYY-MM-DD'));
        const limit = position + daysQuantity;
        return days.slice(position, limit);
    }

    handlePeriodChange(period) {
        this.setState({ period });
    }

    render() {
        const days = this.takeDaysQuantity();
        return (
            <div>
                <CalendarNavigator
                    period={this.state.period}
                    daysQuantity={this.state.daysQuantity}
                    onPeriodChange={this.handlePeriodChange}
                />
                <DaysContainer days={days} />
            </div>
        );
    }
}

export default Calen;
