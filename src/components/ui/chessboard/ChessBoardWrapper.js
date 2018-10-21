import React from 'react'
import styled from 'styled-components'
import './chessboard-0.3.0.css';
import $ from 'jquery'
import ChessBoard from './chessboard-0.3.0'


class ChessBoardComponent extends React.Component {
  componentDidMount() {
    const { state, onChange } = this.props;
    console.log('in ChessBoard componentDidMount',
           'fen:', state.game.fen(),
           'playerSide',
           state.playerSide);

    this.$el = $(this.el);
    const board = ChessBoard(this.$el, {
      draggable: true,
      orientation: state.playerSide === 'w' ? 'white' : 'black',
      position: state.game.fen(),
      onDrop: (source, target) => {
        console.log('onDrop:')
        setTimeout(() => onChange(source, target), 250);
      }
   });
   this.board = board;

   window.onresize = () => { 
     if (this.board) {
       this.board.resize();
     }
    }
  }

  componentWillUnmount() {
    if (this.board) {
      this.board.destroy();      
    }
  }

  render() {
    if (this.board) {
      this.board.position(this.props.state.game.fen());
      // console.log("in ChessBoardWrapper render()")
    }
    return <div id="board" ref={el => this.el = el} />;
  }
}
const ChessBoardWrapper = styled(ChessBoardComponent)`
  padding: 20px;
`;

export default ChessBoardWrapper