const stateMachine = {
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
};

export default stateMachine;