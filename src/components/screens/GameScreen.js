import React from 'react'
import GameMachine from 'state/GameMachine'
import ChessBoardWrapper from 'components/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import Message from 'components/ui/Message'
import EventButton from 'components/ui/EventButton'
import ResponseList from 'components/ui/ResponseList'

const GameScreen = ({ ...props }) => (
  <React.Fragment>
    <ChessBoardWrapper width='400px' {...props} />
    <InfoPanel>
      <GameMachine.State
          is="main"
          render={({ state, extstate }) => (
            <React.Fragment>
              <Message width='400px' stateKey={state} />
              <GameMachine.State 
                  is={['main.game.firstMove',
                       'main.game.challenge']}
                  render={(state) => (
                    <React.Fragment>
                      <ResponseList data={extstate.previousResponses} />
                      <EventButton event={{type: 'INPUT', input: { noTreats: true}}}>
                        I see no threats
                      </EventButton>
                    </React.Fragment>              
                  )} />
            </React.Fragment>
          )}
      />   
    </InfoPanel>
  </React.Fragment>
);

export default GameScreen;