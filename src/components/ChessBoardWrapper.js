import React from 'react'
import styled from 'styled-components';


class ChessBoard extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    console.log('in ChessBoard componentDidMount', 'fen', game.fen());
    const $ = window.$;
    const ChessBoard = window.ChessBoard;
    this.$el = $(this.el);
    this.board = ChessBoard(this.$el, {
      draggable: true,
      position: game.fen(),
      onDrop: (source, target) => {
        this.props.onChange(source, target);
      },
      onSnapEnd: () => {
        this.board.position(game.fen());
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