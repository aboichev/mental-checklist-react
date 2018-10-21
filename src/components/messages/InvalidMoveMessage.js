import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled('div')`
    color: ${props => props.color};
    width: ${props => props.width};
    background-color: red;
`;

const InvalidMoveMessage = ({ ...props }) => (
    <StyledDiv {...props}>
        <h2>
            Invalid Move!  
        </h2>  
        <p>
           Please try not to do that again.
        </p>
    </StyledDiv>
);

export default InvalidMoveMessage