import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'

import GameMachine from './state/GameMachine';

import Layout from './components/Layout'
import InfoPanel from './components/InfoPanel'
import ChessBoardWrapper from './components/ChessBoardWrapper'

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

  handleClick = () => {
    console.log('click');
  }
  
  render() {
    return (
      <GameMachine.Provider>
        <Layout>
          <header>Mental Checklist <button onClick={this.handleClick}>&#9881;</button></header>
          <main>
              <ChessBoardWrapper width='400px' />
              <InfoPanel>It's your turn to move.</InfoPanel>
          </main> 
          <footer>
            &copy;Footer 2018
          </footer>
        </Layout>
      </GameMachine.Provider>
    );
  }
}

export default App
