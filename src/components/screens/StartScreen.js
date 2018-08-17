import React from 'react'
import GameMachine from 'state/GameMachine'
import styled from 'styled-components'
import Message from 'components/ui/Message'
import EventButton from 'components/ui/EventButton'

// Create a Title component that'll render an <h1> tag with some styles
const StartScreenPanel = styled.section`
  width: 100%;
  font-size: 1em;
  text-align: center;
  padding: 20px;
  margin: 0;
  div {
    padding: 10px;
  }
`;

const StartScreen = ({ color }) => (
    <GameMachine.State is='main.startScreen'>
      <StartScreenPanel>
        <Message color="green" />
        <EventButton event="START_GAME" bg="green">Let' Start</EventButton>
      </StartScreenPanel>
    </GameMachine.State>
);

export default StartScreen;