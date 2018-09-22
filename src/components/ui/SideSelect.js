import React from 'react'
import styled from 'styled-components';

const Select = styled('select')`
    margin: 10px;
    padding: 3px;
`;

class SideSelect extends React.Component {
    constructor(props) {
      super(props);
      const { playerSide, onChange } = this.props;
      this.state = {value: playerSide };
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
            <option value="r">Random</option>
            <option value="w">White</option>
            <option value="b">Black</option>
        </Select>         
      );
    }
  }

export default SideSelect;