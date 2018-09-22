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
              cond: (transition, event) => validateSettings(event).valid,
              actions: ['applySettingsChange', 'initGame']
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
  playerSide: 'r',
  defaultPlayerSide: 'r',
  startingPosition: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  previousResponses: [],
  isFirstMove: true
};

export const xsf = createStatefulMachine({ machine, reducer, extstate });
xsf.on('change', log);

export default createReactMachine(xsf);
