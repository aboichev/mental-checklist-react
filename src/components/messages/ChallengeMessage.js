import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled('div')`
    font-size: 1em;
    color: ${props => props.color};
    width: ${props => props.width};
`;

const ChallengeMessage = ({ ...props }) => (
    <StyledDiv {...props}>
        <h2>
            Challenge       
        </h2>  
        <p>
            Show all treats by moving your opponent's pieces and capturing
            yours. When you done with all, click the button.
        </p>
    </StyledDiv>
);

export default ChallengeMessage