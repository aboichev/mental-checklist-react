import React from 'react'
import styled from 'styled-components'
import defaults from './defaults'

const StyledDiv = styled('div')`
    color: ${props => props.color};
`;

const WelcomeMessage = ({ ...props }) => (
    <StyledDiv {...props}>
        <p>
            Greetings, <strong>{props.playerName || defaults.playerName }</strong>.
        </p>
        <p>
            Welcome to <strong>Mental Checklist for Chess</strong>.
        </p>
    </StyledDiv>
);

export default WelcomeMessage