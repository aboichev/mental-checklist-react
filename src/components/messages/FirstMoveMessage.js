import React from 'react'
import styled from 'styled-components'
import defaults from './defaults'

const StyledDiv = styled('div')`
    font-size: 1em;
    color: ${props => props.color};
    width: ${props => props.width};
`;

const FirstMoveMessage = ({ ...props }) => (
    <StyledDiv {...props}>
        <p>
            It's your turn to move, <strong>{ props.playerName || defaults.playerName }</strong>.          
        </p>  
        <p>
          But before you can do that, you must identify all treats from your opponent.
          This should teach you a skill of thinking before it's too late.
        </p>
        <p>      
          You are about to make you first move, do you think your opponent can capture
          any of your pawns of pieces?          
        </p>
        <p>
          If you think there are no treats just click the button.
        </p>
    </StyledDiv>
);

export default FirstMoveMessage