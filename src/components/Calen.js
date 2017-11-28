import React, { PureComponent } from 'react';
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
            period: {
                from: moment('2017-11-20'),
                to: moment('2017-11-26'),
            },
            data: {
                '2017-11-20': {
                    events: [],
                    tasks: [],
                },
                '2017-11-21': {
                    events: [],
                    tasks: [],
                },
                '2017-11-22': {
                    events: [{
                        id: 1,
                        name: '12 Services',
                    }],
                    tasks: [],
                    active: true,
                },
                '2017-11-23': {
                    events: [],
                    tasks: [],
                },
                '2017-11-24': {
                    events: [],
                    tasks: [],
                },
                '2017-11-25': {
                    events: [],
                    tasks: [],
                },
                '2017-11-26': {
                    events: [],
                    tasks: [],
                },
            },
            daysQuantity: 7,
        };
        this.setDaysQuantity = this.setDaysQuantity.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
    }

    componentDidMount() {
        this.startCalendar();
    }

    componentWillUnmount() {
        // TODO: remove event listener
    }

    startCalendar() {
        this.setDaysQuantity();
    }

    setDaysQuantity() {
        let daysQuantity = 7;
        const sm = window.matchMedia("(min-width: 576px)");
        const md = window.matchMedia("(min-width: 768px)");
        const lg = window.matchMedia("(min-width: 992px)");
        const xl = window.matchMedia("(min-width: 1200px)");

        xl.addListener(this.setDaysQuantity);
        lg.addListener(this.setDaysQuantity);
        md.addListener(this.setDaysQuantity);
        sm.addListener(this.setDaysQuantity);

        if (xl.matches) {
            daysQuantity = 7;
        } else if (lg.matches) {
            daysQuantity = 5;
        } else if (md.matches) {
            daysQuantity = 4;
        } else if (sm.matches) {
            daysQuantity = 2;
        } else {
            daysQuantity = 1;
        }

        this.setState({ daysQuantity });

        const period = {
            from: moment().startOf('week'),
            to: moment().startOf('week').add(daysQuantity - 1, 'days')
        };

        if (daysQuantity < 7) {
            period.from = moment();
            period.to = moment().add(daysQuantity - 1, 'days');
        }

        this.handlePeriodChange(period);
        this.setActiveDay({ date: moment().format(DEFAULT_DATE_FORMAT) })
    }

    resetActiveDay() {
        const data = this.state.data;
        return Object.keys(data)
            .reduce((obj, date) => {
                data[date].active = false;
                obj[date] = data[date];
                return obj;
            }, {});
    }

    setActiveDay(day) {
        const data = this.resetActiveDay();
        const date = day.date;
        if (!data.hasOwnProperty(day.date)) {
            data[date] = { events: [], actions: [] };
        }
        data[date].active = true;
        this.setState({ data });
    }

    handleDayClick(day) {
        this.setActiveDay(day);
    }

    handlePeriodChange(period) {
        const today = moment();
        const range = moment.range(period.from, period.to);
        let date = period.from.format(DEFAULT_DATE_FORMAT);
        if (range.contains(today)) {
            date = today.format(DEFAULT_DATE_FORMAT);
        }
        this.setActiveDay({ date });
        this.setState({ period });
    }

    render() {
        return (
            <div>
                <CalendarNavigator
                    period={this.state.period}
                    daysQuantity={this.state.daysQuantity}
                    onPeriodChange={this.handlePeriodChange}
                />
                <Calendar
                    period={this.state.period}
                    data={this.state.data}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}

export default Calen;
