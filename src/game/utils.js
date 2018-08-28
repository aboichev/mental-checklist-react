import Chess from 'chess.js'

const init = (playerSide) => {
  const game = new Chess();
  if (playerSide === 'b') {
    makeRandomMove(game);
  }
  return game;
};

const makeRandomMove = (game, playerSide) => {
  if (!isGameOver(game) && game.turn() === playerSide) {
    return;
  }

  var possibleMoves = game.moves();
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
}

const validateCaptures = (game, input, previousResponses = []) => {
  const captures = getCaptures(game);
  console.log('treats', captures);
  console.log('previous responses', previousResponses);

  if (input.noTreats && captures.length === previousResponses.length) {
    return true;
  }
  
  const notSameAsBefore = previousResponses.find(matchMove(input)) === undefined;
  const foundCapture    = captures.find(matchMove(input));

  console.log('is valid?', notSameAsBefore, foundCapture);
  if (notSameAsBefore && foundCapture) {
    console.log('adding to previous responses', notSameAsBefore, foundCapture);
    input.san = foundCapture.san;
    previousResponses.push(input);
  }

  return false;
}

const matchMove = (input) => x => 
        input.from === x.from && input.to === x.to;

const getCaptures = (game) => {
  const fenArr = game.fen().split(' ');
  console.log(game.fen());
  fenArr[1] = fenArr[1] === 'w' ? 'b' : 'w';
  // remove en-passant square
  fenArr[3] = '-';
  const fakeGameFen = fenArr.join(' ');
  //console.log('fakeGameFen', fakeGameFen);
  const fakeGame = new Chess();
  const validation = fakeGame.validate_fen(fakeGameFen);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  fakeGame.load(fakeGameFen);

  const moves = fakeGame
      .moves({verbose: true});
  //console.log('opponents moves', moves);

  const captures = moves.filter(x => x.flags === 'c' || x.flags === 'pc');

  return captures;
}

const isGameOver = (game) =>  {
  return game.game_over() === true || game.moves().length === 0;
}

export { init, makeRandomMove, validateCaptures, isGameOver };