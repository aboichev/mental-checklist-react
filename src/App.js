import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'

import GameMachine from 'state/GameMachine';

import Layout from 'components/Layout'
import SettingsButton from 'components/ui/SettingsButton'
import StartScreen from 'components/screens/StartScreen'
import GameScreen from 'components/screens/GameScreen'
import ScoreScreen from 'components/screens/ScoreScreen'
import SettingsScreen from 'components/screens/SettingsScreen'

injectGlobal`
  header, main, footer {
    padding: 3px 10px 3px 10px;
    color: #333;
  }
  header {
    background-color: #f0d9b5;  
  }
  header > button {
    float: right;
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
  
  render() {
    return (
      <GameMachine.Provider>
        <GameMachine.Control onDidMount={props => props.init()}>
          <Layout>
            <header>
              <GameMachine.State is="main">
                <SettingsButton event='OPEN_SETTINGS'>&#9881; Options</SettingsButton>
              </GameMachine.State>
            </header>
            <main>
              
            <GameMachine.State is="main.startScreen">
              <StartScreen />
            </GameMachine.State>
             
              <GameMachine.State is="main.game"
                  render={({ extstate, transition }) => (
                     <GameScreen 
                       state={ extstate }                       
                       onChange={ (source, target) => transition({
                            type: 'INPUT',
                            input: {
                              from: source,
                              to: target
                            }
                       })}
                     />
                  )}
               />

              <GameMachine.State is="main.scoreScreen"
                  render={({ extstate }) => (
                    <ScoreScreen state={ extstate } />
                  )}
               />             

              <GameMachine.State is="settingsScreen"
                    render={({ extstate, transition }) => (
                      <SettingsScreen 
                        startingPosition={extstate.startingPosition}
                        defaultPlayerSide={extstate.defaultPlayerSide}
                        strategyName={extstate.strategyName}
                        errors={extstate.settingsErrors}
                        onChange={changes => transition({
                          type: 'SETTINGS_CHANGED',
                          input: changes
                        })}
                      />
                    )} 
              />
               
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
