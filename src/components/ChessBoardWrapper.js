import React from 'react'
import styled from 'styled-components';

class ChessBoard extends React.Component {
  componentDidMount() {
    const { state, onChange } = this.props;
    console.log('in ChessBoard componentDidMount',
           'fen:', state.game.fen(),
           'playerSide',
           state.playerSide);
    const $ = window.$;
    const ChessBoard = window.ChessBoard;
    this.$el = $(this.el);
    this.board = ChessBoard(this.$el, {
      draggable: true,
      orientation: state.playerSide === 'w' ? 'white' : 'black',
      position: state.game.fen(),
      onDrop: (source, target) => {
        onChange(source, target);
      },
      onSnapEnd: () => {
        this.board.position(state.game.fen());
      }
   });
  }

  componentWillUnmount() {
    if (this.board) {
      this.board.destroy();
    }
  }

  render() {
    return <div ref={el => this.el = el} style={{width: this.props.width || '400px'}} />;
  }
}
const ChessBoardWrapper = styled(ChessBoard)`
  padding: 20px;
`;

export default ChessBoardWrapper