import React from 'react'
import GameMachine from 'state/GameMachine'
import styled from 'styled-components'
import messageMap from 'state/messageMap'

const StyledDiv = styled('div')`
    font-size: 1em;
    color: ${props => props.color};
`;

const Message = ({ color }) => (
    <GameMachine.State
        is="main"
        render={({ state }) => (
            <StyledDiv>{ messageMap(state) }</StyledDiv>
        )}
    />
);

export default Message