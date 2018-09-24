import Chess from 'game/Chess'
import getOpponentsThreats from './getOpponentsThreats'
import computerMovesStrategies from './strategies'


const init = (playerSide, fen = null) => {

  const game = fen === null ? new Chess() : new Chess(fen);;
  if (game == null) {
    throw new Error('invalid game');
  }
  if (playerSide !== 'w' && playerSide !== 'b' && playerSide !== 'r') {
    throw new Error("invalid player's side argument");
  }
  return game;
};

const isGameOver = (game) =>  {
  return game.game_over() === true || game.moves().length === 0;
};

const getOpponentMove = (game, playerSide, strategyName) => {
  if (isGameOver(game) || game.turn() === playerSide) {
    return;
  }

  const coord = computerMovesStrategies[strategyName](game);

  game.move(coord);
}

const validateThreats = (game, input, previousResponses = []) => {
  const treats = getOpponentsThreats(game);

  if (input.noTreats && treats.length === previousResponses.length) {
    return true;
  }
  
  const notSameAsBefore = previousResponses.find(matchMove(input)) === undefined;
  const foundCapture    = treats.find(matchMove(input));

  if (notSameAsBefore && foundCapture) {
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
  console.log('validateSettings', event);

  const validateDefaultPlayerSide = (event.input.defaultPlayerSide === 'w' || event.input.defaultPlayerSide === 'b' || event.input.defaultPlayerSide === 'r');
  const validateStartingPosition = tempGame.validate_fen(event.input.startingPosition).valid;
  const validateStrategyName = Object.keys(computerMovesStrategies).indexOf(event.input.strategyName) >= 0; 

  const result = validateDefaultPlayerSide && validateStartingPosition && validateStrategyName;
  console.log('result', result);
  return result;
};

const matchMove = (input) => x => input.from === x.from && input.to === x.to;

export { 
  init,
  getOpponentMove, 
  validateThreats,
  isGameOver,
  isValidMove,
  validateSettings,
  computerMovesStrategies
};