import { Machine } from 'xstate';
import { createStatefulMachine } from '@avaragado/xstateful';
import { createReactMachine } from '@avaragado/xstateful-react';
import { isValidMove, validateSettings } from 'game/utils';
import CONST from 'state/constants';

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
          initial: 'challenge',
          activities: ['gameInProgress'],
          on: {
              START_OVER: 'startScreen',
              GAME_OVER: 'scoreScreen'
          },

          states: {
            challenge: {
              on: {
                INPUT: {
                  challenge: {
                    actions:['isGameOver', 'validateChallenge']
                  }
                },
                CONTINUE: 'move'
              },
              states: {             
                present: {
                  on: {
                    INPUT: {
                      challenge: {
                        actions: ['validateChallenge']
                      }
                    }
                  }
                },
                correct: {
                  activities: [
                    "show_positive_feedback",
                    "feedbackDelay"
                  ],
                  on: {
                    TIMEOUT: "present"
                  }
                },
                wrong: {
                  activities: [
                    "show_negative_feedback",
                    "feedbackDelay"
                  ],
                  on: {
                    TIMEOUT: "present"
                  }
                },                                
              }
            },

            move: {
              on: {
                INPUT: {
                  waitForOpponent: {
                    cond: (extstate, event) => isValidMove(extstate.game, event),
                    actions: ['applyTurn', 'isGameOver']
                  },
                  invalidMove: {
                    cond: (extstate, event) => !isValidMove(extstate.game, event),
                    actions: ['applyTurn', 'isGameOver']
                  }
                }
              }
            },

            waitForOpponent: {
              activities: ['calculate'],
              on: {
                CALCULATION_DONE: 'challenge' 
              }
            },

            invalidMove: {
              onEntry: ['applyTurn'],
              activities: ['invalidMove', 'feedbackDelay'],
              on: {
                TIMEOUT: "move"
              }
            }
          }
        },
        
        scoreScreen: {
          on: {
              START_OVER: {
                startScreen: { actions: ['consoleLog'] }
              }
          },

          states: {
            won: {},
            lost: {},
            draw: {}
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
              cond: (transition, event) => validateSettings(event),
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
  playerSide: localStorage.defaultPlayerSide || 'r',
  defaultPlayerSide: localStorage.defaultPlayerSide || 'r',
  startingPosition: localStorage.startingPosition || CONST.standardPosition,
  strategyName: 'easy',
  previousResponses: [],
  isFirstMove: true
};

export const xsf = createStatefulMachine({ machine, reducer, extstate });
xsf.on('change', log);

export default createReactMachine(xsf);
