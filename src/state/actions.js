import { Reducer } from '@avaragado/xstateful';
import { init } from 'game/utils';

const actions = Reducer.map({
  
  consoleLog: () => {
    console.log('consoleLog');
  },
  
  initGame: ({ extstate: xs }) => {
    console.log('in initGame action');
    const game = init();
    return Reducer.update({ game });
  }, 
  
  validateMove: ({ extstate: xs, event }) => {
    console.log('in validateMove action');
    const game = xs.game;
    game.move({
      from: event.source,
      to: event.target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    return Reducer.update({ game });
  }, 
  
});

export default actions;