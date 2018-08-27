import { Reducer } from '@avaragado/xstateful';
import { init, makeRandomMove, validateCaptures } from 'game/utils';
import { isGameOver } from '../game/utils';

const actions = Reducer.map({  
 
  initGame: ({ extstate: xs }) => {
    console.log('in initGame action', xs.playerSide);
    const game = init(xs.playerSide);
    return Reducer.update({ game });
  },

  playerSwitchesSide: ({ event }) => {
    console.log('in playerSwitchesSide action');    
    const playerSide = event.playerSide;
    return Reducer.update({ playerSide });
  },

  validateChallenge: ({ extstate: xs, event, transition }) => {
    const game = xs.game;
    console.log('in validate action', xs, game);
    
    if (isGameOver(game)) {
      console.log('Game Over');
      return Reducer.effect(xsf => xsf.transition('GAME_OVER'));
    }

    const input = event.input;
    let previousResponses = xs.previousResponses || [];

    console.log('event', input, previousResponses);
    if (validateCaptures(game, input, previousResponses)) {
      previousResponses = [];
      return Reducer.updateWithEffect({ previousResponses }, xsf => xsf.transition('CONTINUE'));
    }
    console.log('more input needed', input, previousResponses);

    return Reducer.update({ previousResponses });
  },
  
  validateMove: ({ extstate: xs, event }) => {
    console.log('in validateMove action');
    const game = xs.game;

    const validMove = game.move({
      from: event.input.from,
      to: event.input.to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    if (validMove) {
      makeRandomMove(xs.game, xs.playerSide);
    }

    return Reducer.update({ game });
  },
  
});

export default actions;