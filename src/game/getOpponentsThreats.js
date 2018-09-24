import Chess from 'game/Chess'

export default (game) => {
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
  const captures = moves.filter(x => x.flags === 'c' || x.flags === 'pc');

  return captures;
};