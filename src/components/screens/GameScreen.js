import React from 'react'
import ChessBoardWrapper from 'components/ChessBoardWrapper'
import InfoPanel from 'components/ui/InfoPanel'
import Message from 'components/ui/Message'
import EventButton from 'components/ui/EventButton'

const GameScreen = ({ ...props }) => {
  
 //console.log('game', game);
 return (
  <React.Fragment>
    <ChessBoardWrapper width='400px' {...props} />
    <InfoPanel>
      <Message color="grey" />
      <EventButton event="CLICK">I'm not ready yet</EventButton>
    </InfoPanel>
  </React.Fragment>
)};

export default GameScreen;