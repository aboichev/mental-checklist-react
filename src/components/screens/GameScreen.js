import React from 'react'
import ChessBoardWrapper from 'components/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import Message from 'components/ui/Message'

const GameScreen = () => (
  <React.Fragment>
    <ChessBoardWrapper width='400px' />
    <InfoPanel>
      <Message color="grey" />
    </InfoPanel>
  </React.Fragment>
);

export default GameScreen;