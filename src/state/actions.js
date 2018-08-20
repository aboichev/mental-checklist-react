import { Reducer } from '@avaragado/xstateful';
import { init, makeRandomMove, validateCaptures } from 'game/utils';

const actions = Reducer.map({  
 
  initGame: ({ extstate: xs }) => {
    console.log('in initGame action', xs.playerSide);
    const game = init(xs.playerSide);
    return Reducer.update({ game });
  },

  computerMakesMove: ({ extstate: xs }) => {
    console.log('in moveIfComputerPlaysWhite action');
    const game = xs.game;    
    if (game.turn() !== xs.playerSide) {
      makeRandomMove(xs.game);
    } 
    return Reducer.update({ game });
  },

  playerSwitchesSide: ({ extstate: xs, event }) => {
    console.log('in playerSwitchesSide action');    
    const playerSide = event.playerSide;
    return Reducer.update({ playerSide });
  },

  validateResponse: ({ extstate: xs, event, transition }) => {
    console.log('in validateResponse action');
    const game = xs.game;
    const userAnswers = xs.userAnswers || [];
    if (event.source && event.target) {
      userAnswers.push({from: event.source, to: event.target });
    }

    let nextEvent;
    if (validateCaptures(game, userAnswers) === 'done') {
      nextEvent = 'CONTINUE';
    }
    else {
      nextEvent = 'TRY_AGAIN';
    }
    console.log('nextEvent', nextEvent);
    return Reducer.effect(xsf => {
      setTimeout(() => xsf.transition(nextEvent), 1000);
    });
  },
  
  validateMove: ({ extstate: xs, event }) => {
    console.log('in validateMove action');
    const game = xs.game;

    const result = game.move({
      from: event.source,
      to: event.target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    console.log('move:', event.source, event.target, result);
    return Reducer.update({ game });
  }, 
  
});

export default actions;