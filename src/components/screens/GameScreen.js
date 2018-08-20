import React from 'react'
import GameMachine from 'state/GameMachine'
import ChessBoardWrapper from 'components/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import Message from 'components/ui/Message'
import EventButton from 'components/ui/EventButton'

const GameScreen = ({ ...props }) => (
  <React.Fragment>
    <ChessBoardWrapper width='400px' {...props} />
    <InfoPanel>
      <GameMachine.State
          is="main"
          render={({ state }) => (
            <React.Fragment>
              <Message width='400px' stateKey={state} />
              <GameMachine.State is={['main.game.firstMove',
                                      'main.game.waitForCaptureAnswer']}>
                <EventButton event="NO_TREATS">
                  I see no threats
                </EventButton>
              </GameMachine.State>
            </React.Fragment>
          )}
      />   
    </InfoPanel>
  </React.Fragment>
);

export default GameScreen;