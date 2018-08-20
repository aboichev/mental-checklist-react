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
                  },
                  PLAYER_SWITCHES_SIDE: {
                    startScreen: { actions: ['playerSwitchesSide'] }
                  }
              }
            },
            
            game: {
              initial: 'firstMove',
              on: {
                  START_OVER: 'startScreen'
              },
              states: {
                firstMove: {
                  on: {
                    NO_TREATS: 'feedback'
                  }
                },
                waitForCaptureAnswer: {
                  on: {
                    NO_TREATS: 'feedback',
                    BOARD_CHANGED: 'feedback'
                  }               
                },
                feedback: {
                  onEntry: ['validateResponse'],
                  on: {
                    CONTINUE: 'waitForPlayerTurn'
                  }
                },
                tryAgain: {
                  on: {
                    OK: 'waitForPlayerTurn'
                  }
                },
                waitForPlayerTurn: {
                  on: {
                    BOARD_CHANGED: {
                      waitForCaptureAnswer: { actions: ['validateMove', 'computerMakesMove'] }
                    }
                  }
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

const extstate = { playerSide: 'w'};

export const xsf = createStatefulMachine({ machine, reducer, extstate });
export default createReactMachine(xsf);
