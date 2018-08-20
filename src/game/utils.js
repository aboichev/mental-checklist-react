import Chess from 'chess.js'

const init = (playerSide) => {
  const game = new Chess();
  if (playerSide === 'b') {
    makeRandomMove(game);
  }
  return game;
};

const makeRandomMove = (game) => {
  var possibleMoves = game.moves();
  if (!isGameOver(game)) {
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
  }
}

const validateCaptures = (game, userAnswers) => {

  const fenArr = game.fen().split(' ');
  fenArr[1] = fenArr[1] === 'w' ? 'b' : 'w';
  const fakeGame = new Chess(fenArr.join(' '));
  var treats = fakeGame
      .moves({verbose: true})
      .filter(x => x.flags === 'c' || x.flags === 'pc');

  console.log('treats', treats);
  return 'done';
}

const isGameOver = (game) =>  {
  return game.game_over() === true || game.moves().length === 0;
}

export { init, makeRandomMove, validateCaptures };