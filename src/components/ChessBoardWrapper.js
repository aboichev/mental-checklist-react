import React from 'react'
import styled from 'styled-components';


class ChessBoard extends React.Component {
  componentDidMount() {
    console.log('in ChessBoard componentDidMount');
    const $ = window.$;
    const ChessBoard = window.ChessBoard;
    this.$el = $(this.el);
    this.board = ChessBoard(this.$el, {
      draggable: true,
      position: 'start',
      onChange: (oldPos, newPos) => {
        console.log('onChange');
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