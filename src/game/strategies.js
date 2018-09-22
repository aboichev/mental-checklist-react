import Chess from 'chess.js'

const getCaptures = (moves) => moves.filter(x => x.flags === 'c' || x.flags === 'pc');

const getOpponentsThreats = (game) => {
  const fenArr = game.fen().split(' ');
  fenArr[1] = fenArr[1] === 'w' ? 'b' : 'w';
  // remove en-passant square
  fenArr[3] = '-';
  const fen = fenArr.join(' ');
  const tempGame = new Chess();
  const validation = tempGame.validate_fen(fen);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  tempGame.load(fen);

  const moves    = tempGame.moves({verbose: true});
  const captures = getCaptures(moves);

  return captures;
};

const computerMovesStrategies = {
    random: (game) => {
      var possibleMoves = game.moves();
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      return possibleMoves[randomIndex];
    },
    dumb: (game) => {
      var possibleMoves = game.moves({verbose: true});
      var captures = getCaptures(possibleMoves);
      if (captures.length === 0) {
        return computerMovesStrategies.random(game);
      }
      return captures[0];
    }
  };

  export {
      computerMovesStrategies,
      getOpponentsThreats
  }