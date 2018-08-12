const actionReducer = (action) => {
  if(action === 'consoleLog') {
    console.log('Fired action: consoleLog')
  }
}

export default actionReducer;