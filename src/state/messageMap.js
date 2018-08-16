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
  let result = null;
  if (typeof state.value === 'string') {
      console.log('message state', state && state.value);
      result = map[state.value];
      console.log('result', result);
      if (result === undefined) {
        return null;
      }
      if (result != null && typeof result === 'string') {
        return result;
      }
  }
  if (!!result) {
    const key = Object.keys(result)[0];
    return messageMap({value: key}, result);
  }
  
  console.log('keys', state.value);
  const key = Object.keys(state.value)[0];
  console.log('first key', key);
  return messageMap({value: key});

}
export default messageMap;