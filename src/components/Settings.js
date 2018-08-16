import React from 'react'
import GameMachine from 'state/GameMachine'
import styled from 'styled-components'
import EventButton from 'components/EventButton'

// Create a Title component that'll render an <h1> tag with some styles
const SettingsPanel = styled.div`
  font-size: 1em;
  text-align: center;
  padding: 20px;
  margin: 0;
`;

const Settings = ({ color }) => (
    <GameMachine.State is='settingsScreen'>
      <SettingsPanel>
        <header>
           <h1>Settings</h1>
        </header>
        <main>
          <label htmlFor="fenStr">Paste FEN here:</label>
          <input type="text" id="fenStr" />
        </main>
        <footer>
          <EventButton event='CLOSE_SETTINGS'>OK</EventButton>
        </footer>
      </SettingsPanel>
    </GameMachine.State>
);

export default Settings;