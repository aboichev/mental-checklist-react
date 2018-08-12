import React, { Component } from 'react'
import { mountXstate } from 'react-xstate'
import { injectGlobal } from 'styled-components'

import Layout from './components/Layout'
import InfoPanel from './components/InfoPanel'
import ChessBoardWrapper from './components/ChessBoardWrapper'

import stateMachine from './state/stateMachine'
import actionReducer  from './state/actionReducer'

injectGlobal`
  header, main, footer {
    padding: 10px;
    color: #333;
  }
  header {
    background-color: #f0d9b5;
  }
  main {
    background-color: #f0d9b566;
  }
  footer {   
    text-align: center;  
    background-color: #b58863;
    color: #DECCCC
  }
`

class App extends Component {
 
  constructor(props) {
    super(props);
  }
  
  handleClick() {
    console.log('button clicked');
    //this.props.transition({ type: 'CLICK' });
  }
  
  render() {
       
    const { xstate: { value: state } } = this.props;
    console.log(`State: ${JSON.stringify(state)}`);

    return (
      <Layout>
        <header>Mental Checklist <button onClick={this.handleClick()}>&#9881;</button></header>
        <main>
            <ChessBoardWrapper width='600px' />
            <InfoPanel>It's your turn to move.</InfoPanel>
        </main> 
        <footer>
          &copy;Footer 2018
        </footer>
      </Layout>
    );
  }
}

export default mountXstate(stateMachine, [actionReducer])(App)
