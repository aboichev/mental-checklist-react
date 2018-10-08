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
    //const $ = window.$;
    //const ChessBoard = window.ChessBoard;
    this.$el = $(this.el);
    const board = ChessBoard(this.$el, {
      draggable: true,
      orientation: state.playerSide === 'w' ? 'white' : 'black',
      position: state.game.fen(),
      onDrop: (source, target) => {
        setTimeout(() => onChange(source, target), 250);
        //onChange(source, target);
      },
      onSnapEnd: () => {
        console.log('onSnapEnd');
        //board.position(state.game.fen()); 
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
    }
    return <div id="board" ref={el => this.el = el} />;
  }
}
const ChessBoardWrapper = styled(ChessBoardComponent)`
  padding: 20px;
`;

export default ChessBoardWrapper