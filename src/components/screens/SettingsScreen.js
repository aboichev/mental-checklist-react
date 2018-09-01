import React from 'react'
import styled from 'styled-components'
import EventButton from 'components/ui/EventButton'

// Create a Title component that'll render an <h1> tag with some styles
const SettingsPanel = styled.section`
  width: 100%;
  font-size: 1em;
  text-align: center;
  padding: 20px;
  margin: 0;
  div {
    padding: 10px;
  }
  input {
    width: 70%
  }
`;

const SettingsScreen = ({ color, ...props }) => (
      <SettingsPanel>
          <h1>Settings</h1>
          <div>
            <label htmlFor="fenStr">Paste FEN here:</label>
          </div>
          <div>            
            <input type="text" id="fenStr" defaultValue={props.fen}
               onChange={(e) => {
                 if (props.onChange) {
                  props.onChange({
                    fen: e.target.value
                  });
                 }
               }} />
          </div>
          <div>
           <EventButton event='CLOSE_SETTINGS'>OK</EventButton>
          </div>
      </SettingsPanel>
);

export default SettingsScreen;