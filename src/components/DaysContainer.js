import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Day from './Day';

const DaysListStyled = styled.div`
    ul.calen-list {
        display: flex;
        flex-wrap: wrap;
        list-style:none;
        width: 100%;
    }
    li.calen-list-item {
        flex: 1;
        display:flex;
        width:100%;
    }
`;

class DaysContainer extends PureComponent {
    render() {
        const days = this.props.days;
        return (
            <DaysListStyled>
                <ul className="calen-list">
                    {days.map(day => (
                        <li className="calen-list-item" key={day.date}>
                            <Day {...day}/>
                        </li>
                    ))}
                </ul>
            </DaysListStyled>
        );
    }
}

export default DaysContainer;