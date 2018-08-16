import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'

import GameMachine from 'state/GameMachine';

import Layout from 'components/Layout'
import InfoPanel from 'components/InfoPanel'
import EventButton from 'components/EventButton'
import Message from 'components/Message'
import Settings from 'components/Settings'
import ChessBoardWrapper from 'components/ChessBoardWrapper'

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
        <GameMachine.Control onDidMount={props => props.init()}>
          <Layout>
            <header>Mental Checklist <EventButton event='OPEN_SETTINGS'>&#9881;</EventButton></header>
            <main>
              <GameMachine.State is="main.game">
                <ChessBoardWrapper width='400px' />
              </GameMachine.State>
              <InfoPanel>
                <Message color="grey" />
                <GameMachine.State is="main.startScreen">
                  <EventButton event="START_GAME">Start</EventButton>
                </GameMachine.State>
              </InfoPanel>
              <GameMachine.State is="settingsScreen">
                <Settings/>
              </GameMachine.State>
            </main> 
            <footer>
              &copy;Footer 2018
            </footer>
          </Layout>
        </GameMachine.Control>
      </GameMachine.Provider>
    );
  }
}

export default App
