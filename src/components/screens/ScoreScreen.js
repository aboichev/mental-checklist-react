import React from 'react'
import GameMachine from 'state/GameMachine'
import styled from 'styled-components'
import Message from 'components/ui/Message'
import EventButton from 'components/ui/EventButton'

// Create a Title component that'll render an <h1> tag with some styles
const ScoreScreenPanel = styled.section`
  font-size: 1em;
  text-align: center;
  padding: 20px;
  margin: 0;
`;

const ScoreScreen = ({ color }) => (
    <GameMachine.State is='startScreen'>
      <ScoreScreenPanel>
      <Message color="green" />
        <EventButton event="START_OVER" bg="yellow">StartOver</EventButton>
      </ScoreScreenPanel>
    </GameMachine.State>
);

export default ScoreScreen;