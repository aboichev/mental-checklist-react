import Chess from 'chess.js'

const init = (playerSide, fen = null) => {

  const game = fen === null ? new Chess() : new Chess(fen);;
  if (game == null) {
    throw new Error('invalid game');
  }
  if (playerSide !== 'w' && playerSide !== 'b') {
    throw new Error("invalid player's side argument");
  }

  if (game.turn() !== playerSide) {
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
};

const isValidMove = (game, event) => {
  const move = game.move({
    from: event.input.from,
    to: event.input.to,
    promotion: 'q' // TODO: implement promotion use case
  });

  return move !== null;
};

const validateSettings = (event) => {
  const tempGame = new Chess();
  console.log('event', event);
  return tempGame.validate_fen(event.input.fen);
};

const matchMove = (input) => x => 
        input.from === x.from && input.to === x.to;

const getCaptures = (game) => {
  const fenArr = game.fen().split(' ');
  console.log(game.fen());
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

  const moves = tempGame
      .moves({verbose: true});

      const captures = moves.filter(x => x.flags === 'c' || x.flags === 'pc');

  return captures;
};

const isGameOver = (game) =>  {
  return game.game_over() === true || game.moves().length === 0;
};

export { init,
  makeRandomMove, 
  validateCaptures,
  isGameOver,
  isValidMove,
  validateSettings
};