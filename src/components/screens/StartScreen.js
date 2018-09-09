import React from 'react'
import GameMachine from 'state/GameMachine'
import styled from 'styled-components'
import WelcomeMessage from 'components/messages/WelcomeMessage'
import EventButton from 'components/ui/EventButton'
import SideSelect from 'components/ui/SideSelect'

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

const StartScreen = () => (
    <GameMachine.State is="main.startScreen"
      render={({ extstate, transition }) =>  {
        console.log('defaultPlayerSide', extstate.defaultPlayerSide);
        return (
          <StartScreenPanel>
            <WelcomeMessage />
            <label> I want to play: 
              <SideSelect playerSide={ extstate.defaultPlayerSide } onChange={(newVal) => {
                transition({type: 'PLAYER_SWITCHES_SIDE', playerSide: newVal });
              }}/>
            </label>
            <div>
              <EventButton event="START_GAME" bg="green">Let' Start</EventButton>
            </div>
         </StartScreenPanel>
        );
      }}
    /> 
);

export default StartScreen;