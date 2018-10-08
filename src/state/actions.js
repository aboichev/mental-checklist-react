import { Reducer } from '@avaragado/xstateful';
import { init, getOpponentMove, validateThreats } from 'game/utils';
import { isGameOver } from '../game/utils';

const actions = Reducer.map({  
 
  initGame: ({ extstate: xs }) => {

    if (xs.playerSide === 'r') {      
       xs.playerSide = Math.random() >= 0.5 ? 'w': 'b';
    }

    const game = init(xs.playerSide, xs.startingPosition);

    if (game.turn() !== xs.playerSide) {
      getOpponentMove(game, xs.playerSide,  xs.strategyName);
    }

    return Reducer.update({ game });
  },

  playerSwitchesSide: ({ event }) => {   
    const playerSide = event.playerSide;
    return Reducer.update({ playerSide });
  },

  applySettingsChange: ({ event }) => {
    const defaultPlayerSide = event.input.defaultPlayerSide;
    const playerSide = defaultPlayerSide;
    const strategyName = event.input.strategyName;

    localStorage.defaultPlayerSide = defaultPlayerSide;

    const startingPosition = event.input.startingPosition;
    console.log('ddd', event.input.startingPosition);
    localStorage.startingPosition = startingPosition;

    return Reducer.update({ defaultPlayerSide, playerSide, strategyName, startingPosition });
  },

  validateChallenge: ({ extstate: xs, event }) => {
    const game = xs.game;
  
    const input = event.input;
    let previousResponses = xs.previousResponses || [];

    if (validateThreats(game, input, previousResponses)) {
      previousResponses = [];
      return Reducer.updateWithEffect({ previousResponses }, xsf => xsf.transition('CONTINUE'));
    }

    return Reducer.update({ previousResponses });
  },

  applyTurn: ({ extstate: xs, event }) => {
    const game = xs.game;

    // apply player's move
    game.move({
      from: event.input.from,
      to: event.input.to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    return Reducer.update({ game, fen: game.fen() });
  },

  isGameOver: ({ extstate: xs }) => {
    if (isGameOver(xs.game)) {
      return Reducer.effect( xsf => xsf.transition('GAME_OVER'));
    }
    return Reducer.noUpdate();
  },

  "calculate:start": ({ extstate: xs }) => { 
    console.log('in calculate:start');
    const game = xs.game;

    return Reducer.effect(xsf => {
      if (game.turn() !== xs.playerSide) {
        getOpponentMove(game, xs.playerSide, xs.strategyName);
        xsf.setExtState({ game });
        console.log('calculation done');
        xsf.transition('CALCULATION_DONE');
      }
    });
  },

  ...Reducer.util.timeoutActivity({
    activity: "transitionDelay",
    ms: 500,
    event: "TIMEOUT"
  }).map,

  ...Reducer.util.timeoutActivity({
    activity: "feedbackDelay",
    ms: 1500,
    event: "TIMEOUT"
  }).map,
    
});

export default actions;