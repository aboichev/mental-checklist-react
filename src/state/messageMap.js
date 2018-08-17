const messages = {
  main: {
    startScreen: "Welcome to Chess Mental Checklist!",
    game: "It's on. Make your move"
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