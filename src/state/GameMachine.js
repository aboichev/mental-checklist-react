import { Machine } from 'xstate';
import { createStatefulMachine } from '@avaragado/xstateful';
import { createReactMachine } from '@avaragado/xstateful-react';
import { isValidMove, validateSettings } from 'game/utils';

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
                START_OVER: 'startScreen',
                GAME_OVER: 'scoreScreen'
            },
            states: {
              firstMove: {
                on: {
                  INPUT: {
                    challenge: {
                      actions: ['validateChallenge']
                    }
                  }
                }
              },
              challenge: {
                on: {
                  INPUT: {
                    challenge: {
                      actions:['validateChallenge']
                    }
                  },
                  CONTINUE: 'move'
                }
              },
              move: {
                on: {
                  INPUT: {
                    challenge: {
                      cond: (extstate, event) => isValidMove(extstate.game, event),
                      actions: ['finilizeTurn', 'validateChallenge']
                    }
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
          CLOSE_SETTINGS: 'main.hist',
          SETTINGS_CHANGED: {
            settingsScreen: {
              cond: (extstate, event) => validateSettings(event).valid,
              actions: ['applySettingsChange']
            }
          }
      }          
    }
  }
});

const log = ({ state, extstate: xs }) => {
  console.log(
      `state: ${JSON.stringify(state.value, null, 4)}, playerSide: ${xs && xs.playerSide}`,
  );
};

const extstate = { 
  playerSide: 'w',
  previousResponses: [], 
  //fen: '5k1B/n6p/p1B5/1p6/6Q1/7P/PP3P1P/R3K2R w KQ - 5 24'
};

export const xsf = createStatefulMachine({ machine, reducer, extstate });
xsf.on('change', log);

export default createReactMachine(xsf);
