import React from 'react'
import GameMachine from 'state/GameMachine'
import ChessBoardWrapper from 'components/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import FirstMoveMessage from 'components/messages/FirstMoveMessage'
import ChallengeMessage from 'components/messages/ChallengeMessage';
import MoveMessage from 'components/messages/MoveMessage';
import EventButton from 'components/ui/EventButton'
import ResponseList from 'components/ui/ResponseList'

const GameScreen = ({ ...props }) => (
  <React.Fragment>
    <ChessBoardWrapper width='400px' {...props} />
    <InfoPanel>
      <GameMachine.State
          is="main"
          render={({ extstate }) => (
            <React.Fragment>
              <GameMachine.State is="main.game.firstMove">
                <FirstMoveMessage width='400px' />
              </GameMachine.State>
              <GameMachine.State is="main.game.challenge">
                <ChallengeMessage width='400px' />
              </GameMachine.State>
              <GameMachine.State is="main.game.move">
                <MoveMessage width='400px' />
              </GameMachine.State>              
              <GameMachine.State 
                  is={['main.game.firstMove',
                       'main.game.challenge']}
                  render={(state) => (
                    <React.Fragment>
                      <ResponseList data={extstate.previousResponses} />
                      <EventButton event={{type: 'INPUT', input: { noTreats: true}}}>
                        I see no { extstate.previousResponses.length > 0 ? ' more ' : '' }
                        threats
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