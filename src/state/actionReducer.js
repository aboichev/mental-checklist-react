const actionReducer = (action, event, xstate) => {
  if(action === 'consoleLog') {
    console.log('Fired action:', action, event, xstate);
  }
}

export default actionReducer;