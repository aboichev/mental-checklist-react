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
                    game: { actions: ['consoleLog'] }
                  }
              }
            },
            
            game: {
              on: {
                  CLICK: {
                    summaryScreen: { actions: ['consoleLog'] }
                  }
              }
            },
            
            summaryScreen: {
              on: {
                  CLICK: {
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
        },

    }
});

export const xsf = createStatefulMachine({ machine, reducer, extstate: {} });
export default createReactMachine(xsf);
