import { Machine } from 'xstate';
import { createStatefulMachine } from '@avaragado/xstateful';
import { createReactMachine } from '@avaragado/xstateful-react';

import reducer from './actions';

const machine = Machine({
    initial: 'main',
    states: {
        main: {
          initial: 'startScreen',
          on: {
              OPEN_SETTINGS: 'settingsScreen'
          },
          states: {
            
            startScreen: {
              on: {
                  START_GAME: {
                    game: { actions: ['initGame'] }
                  }
              }
            },
            
            game: {
              on: {
                  START_OVER: 'startScreen',
                  BOARD_CHANGED: {
                    game: { actions: ['validateMove'] }
                  }
              }
            },
            
            scoreScreen: {
              on: {
                  START_OVER: {
                    startScreen: { actions: ['consoleLog'] }
                  }
              }
            },
            
            hist: { history: true }
          }
        },

        settingsScreen: {
          on: {
             CLOSE_SETTINGS: 'main.hist'
          }              
        }

    }
});

export const xsf = createStatefulMachine({ machine, reducer });
export default createReactMachine(xsf);
