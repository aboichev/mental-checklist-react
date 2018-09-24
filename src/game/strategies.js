import evaluateBoard from './evaluateBoard'
import getBestMove from './minimax'

const catpuresOnly = x => x.flags === 'c' || x.flags === 'pc';

const computerMovesStrategies = {

    random: (game) => {
      var possibleMoves = game.moves();
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      return possibleMoves[randomIndex];
    },

    dumb: (game) => {
      const possibleMoves = game.moves({verbose: true});
      const captures = possibleMoves.filter(catpuresOnly);

      if (captures.length === 0) {
        return computerMovesStrategies.random(game);
      }

      const isBlack = game.turn() === 'b';
      let bestMove  = null;
      let bestValue = -9999;
  
      for (var i = 0; i < captures.length; i++) {
          var captureMove = captures[i];
          game.move(captureMove);
          var gameValue = evaluateBoard(game.board());
          var boardValue = isBlack ? -gameValue : gameValue;
          game.undo();
  
          if (boardValue > bestValue) {
            bestValue = boardValue;
            bestMove = captureMove;
          }
      }

      return bestMove;
    },

    easy: (game) => {
      return getBestMove(2, game);
    }
 };

 export default computerMovesStrategies;