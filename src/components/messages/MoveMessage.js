import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled('div')`
    font-size: 1em;
    color: ${props => props.color};
    width: ${props => props.width};
`;

const MoveMessage = ({ ...props }) => (
    <StyledDiv {...props}>
        <h2>
            Good Job!       
        </h2>  
        <p>
           It's your turn to move now.
        </p>
    </StyledDiv>
);

export default MoveMessage