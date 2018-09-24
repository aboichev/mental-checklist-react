import React from 'react'
import styled from 'styled-components';

const Select = styled('select')`
    margin: 10px;
    padding: 3px;
`;

class StrategySelect extends React.Component {
    constructor(props) {
      super(props);
      const { strategyName, onChange } = this.props;
      this.state = { value: strategyName };

      console.log('in strategy select', strategyName);

      this.onChange = onChange;
      this.handleChange = this.handleChange.bind(this); 
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      console.log('event.target.value', event.target.value);
      this.onChange(event.target.value);
    }

    render() {
      return (      
        <Select value={this.state.value} onChange={(e) => this.handleChange(e)}>
            <option value="random">Random (easiest)</option>
            <option value="dumb">Dumb (will take any piece)</option>
            <option value="easy">Easy</option>
        </Select>         
      );
    }
  }

export default StrategySelect;