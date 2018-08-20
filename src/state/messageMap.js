const messages = {
  main: {
    startScreen: "Welcome to Chess Mental Checklist!",
    game: {
      firstMove: `It's your turn to move.
          But before you can move you must identify all treats from your opponent,
          which means any possible capture of your pawns or peaces.
          You are about to make you first turn, do you think any captures even possible?
          If you think there are no treats just click "I see no treats" button.
        `
    },
    scoreScreen: "Game's over. Your score is: 0"
  }
}

const messageMap = (state, map = messages) => {
  if (!state || !state.value) {
    return null;
  }

  if (typeof state.value === 'object') {
      const key = Object.keys(state.value)[0];
      return messageMap({value: state.value[key]}, map[key]);      
  }

  return map[state.value];
}

export default messageMap;