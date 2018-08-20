import React from 'react'
import styled from 'styled-components';
import GameMachine from 'state/GameMachine'

const Select = styled('select')`
    margin: 10px;
    padding: 3px;
`;

class SideSelect extends React.Component {
    constructor(props) {
      super(props);
      const { playerSide } = this.props;
      this.state = {value: playerSide };  
      this.handleChange = this.handleChange.bind(this); 
    }
  
    handleChange(event, transition) {
      this.setState({value: event.target.value});
      transition({type: 'PLAYER_SWITCHES_SIDE', playerSide: event.target.value});
    }

    render() {
      return (
            <GameMachine
                render={({ transition }) => (
                    <label>
                        I want to play:
                        <Select value={this.state.value} onChange={(e) => this.handleChange(e, transition)}>
                            <option value="w">White</option>
                            <option value="b">Black</option>
                        </Select>
                    </label>
                )}
            />          
      );
    }
  }

export default SideSelect;