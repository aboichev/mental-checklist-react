import { Reducer } from '@avaragado/xstateful';
import { init, getOpponentMove, validateThreats } from 'game/utils';
import { isGameOver } from '../game/utils';

const actions = Reducer.map({  
 
  initGame: ({ extstate: xs }) => {
    console.log('in initGame action', xs.playerSide);

    if (xs.defaultPlayerSide === 'r') {      
       xs.playerSide = Math.random() >= 0.5 ? 'w': 'b';
    }
    else {
      xs.playerSide = xs.defaultPlayerSide;
    }

    const game = init(xs.playerSide, xs.startingPosition);

    if (game.turn() !== xs.playerSide) {
      getOpponentMove(game, xs.playerSide,  xs.strategyName);
    }

    return Reducer.update({ game });
  },

  playerSwitchesSide: ({ event }) => {
    console.log('in playerSwitchesSide action');    
    const playerSide = event.playerSide;
    return Reducer.update({ playerSide });
  },

  applySettingsChange: ({ event }) => {
    const defaultPlayerSide = event.input.defaultPlayerSide;
    const playerSide = defaultPlayerSide;
    const strategyName = event.input.strategyName;

    const startingPosition = event.input.startingPosition;
    console.log("in applySettingsChange action", defaultPlayerSide, startingPosition, strategyName);
    return Reducer.update({ defaultPlayerSide, playerSide, strategyName, startingPosition });
  },

  validateChallenge: ({ extstate: xs, event }) => {
    const game = xs.game;
    console.log('in validate action', xs, game);
    
    if (isGameOver(game)) {
      console.log('Game Over');
      return Reducer.effect(xsf => xsf.transition('GAME_OVER'));
    }

    const input = event.input;
    let previousResponses = xs.previousResponses || [];

    console.log('event', input, previousResponses);
    if (validateThreats(game, input, previousResponses)) {
      previousResponses = [];
      return Reducer.updateWithEffect({ previousResponses }, xsf => xsf.transition('CONTINUE'));
    }
    console.log('more input needed', input, previousResponses);

    return Reducer.update({ previousResponses });
  },

  finilizeTurn: ({ extstate: xs, event }) => {
    console.log('in finilizeTurn action', xs.strategyName);
    const game = xs.game;

    // apply player's move
    game.move({
      from: event.input.from,
      to: event.input.to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    if (game.turn() !== xs.playerSide) {
      getOpponentMove(game, xs.playerSide, xs.strategyName);
    }

    return Reducer.update({ game, fen: game.fen() });
  },
    
});

export default actions;