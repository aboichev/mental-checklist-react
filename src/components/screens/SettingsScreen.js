import React from 'react'
import styled from 'styled-components'
import EventButton from 'components/ui/EventButton'
import SideSelect from 'components/ui/SideSelect'
import StrategySelect from 'components/ui/StrategySelect'
import CONST from 'state/constants'

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

class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      defaultPlayerSide: props.defaultPlayerSide,
      startingPosition: props.startingPosition,
      strategyName: props.strategyName
    };

    this.onChange = props.onChange;
    this.handleChange = this.handleChange.bind(this); 
    this.resetPosition = this.resetPosition.bind(this);
  }

  handleChange(update) {
    this.onChange(Object.assign(this.state, update));
  }
  
  resetPosition() {
    this.setState({ startingPosition: CONST.standardPosition });
    this.handleChange({ startingPosition: CONST.standardPosition});
  }

  render() {
    return (
      <SettingsPanel>
        <h1>Settings</h1>
        <div><label htmlFor="sideSelect">I like to start my games as: </label>
          <SideSelect id="sideSelect" playerSide={ this.state.defaultPlayerSide } onChange={ (selectedValue) => this.handleChange({ defaultPlayerSide: selectedValue }) } />
        </div>
        <div>
          <label htmlFor="fenStr">Starting position (FEN):</label>
        </div>
        <div>
          <button onClick={ this.resetPosition }>Reset</button>
          <input type="text" id="fenStr" 
            value={ this.state.startingPosition }
            onChange={ (e) => this.handleChange({ startingPosition: e.target.value }) } />
        </div>
        <div>
          <label htmlFor="strategySelect">Computer Opponent Difficulty:</label>
        </div>
        <div>     
          <StrategySelect id="strategySelect" strategyName={ this.state.strategyName } onChange={ (selectedValue) => this.handleChange({ strategyName: selectedValue }) } />
        </div>
        <div>
          <EventButton event='CLOSE_SETTINGS'>OK</EventButton>
        </div>
      </SettingsPanel>   
    );
  }
}

export default SettingsScreen;