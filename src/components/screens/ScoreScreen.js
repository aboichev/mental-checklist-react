import React from 'react'
import ChessBoardWrapper from 'components/ui/chessboard/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import EventButton from 'components/ui/EventButton'


const makeRandomScore = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ScoreScreen = ({ color, ...props }) => (
  <React.Fragment>
    <ChessBoardWrapper width='400px' {...props} />
    <InfoPanel>
      <h2>Game Over</h2>
      <p>
        Your score is: <strong>{makeRandomScore(500, 2000)}</strong>
      </p>
      <p>
        <EventButton event="START_OVER">Start Over</EventButton>
      </p>      
    </InfoPanel>
  </React.Fragment>
);

export default ScoreScreen;