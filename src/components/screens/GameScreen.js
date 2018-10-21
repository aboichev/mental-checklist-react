import React from 'react'
import GameMachine from 'state/GameMachine'
import ChessBoardWrapper from 'components/ui/chessboard/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import FirstMoveMessage from 'components/messages/FirstMoveMessage'
import ChallengeMessage from 'components/messages/ChallengeMessage'
import MoveMessage from 'components/messages/MoveMessage'
import InvalidMoveMessage from 'components/messages/InvalidMoveMessage'
import EventButton from 'components/ui/EventButton'
import ResponseList from 'components/ui/ResponseList'

const GameScreen = ({ ...props }) => (
  <React.Fragment>
    <ChessBoardWrapper id="board" {...props} />
    <InfoPanel>
      <GameMachine.Activity is="gameInProgress"
          render={({ extstate }) => (
            <React.Fragment>
              <GameMachine.State 
                  is={['main.game.firstMove',
                       'main.game.challenge']}
                  render={(state) => (
                    <React.Fragment>
                      <EventButton event={{type: 'INPUT', input: { noTreats: true}}}>
                        I see no { extstate.previousResponses.length > 0 ? ' more ' : '' }
                        threats
                      </EventButton>
                      <ResponseList data={extstate.previousResponses} />
                    </React.Fragment>              
                  )} />
              <GameMachine.Activity is="calculate">
                   <div>Thinking...</div>
              </GameMachine.Activity>

              <GameMachine.State is="main.game.firstMove">
                <FirstMoveMessage />
              </GameMachine.State>
              <GameMachine.State is="main.game.challenge">
                <ChallengeMessage />
              </GameMachine.State>
              <GameMachine.State is="main.game.move">
                <MoveMessage />
              </GameMachine.State>              
            </React.Fragment>
          )}
      />
      <GameMachine.Activity is="invalidMove">
          <InvalidMoveMessage />
      </GameMachine.Activity>
    </InfoPanel>
  </React.Fragment>
);

export default GameScreen;