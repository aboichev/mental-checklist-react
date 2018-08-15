import { Machine } from 'xstate';
import { createStatefulMachine } from '@avaragado/xstateful';
import { createReactMachine } from '@avaragado/xstateful-react';

import reducer from './actions';

const machine = Machine({
    initial: 'startScreen',
    states: {
        startScreen: {
        on: {
            CLICK: {
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
        }
    }
});

export const xsf = createStatefulMachine({ machine, reducer, extstate: {} });
export default createReactMachine(xsf);
