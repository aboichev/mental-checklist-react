import { Reducer } from '@avaragado/xstateful';

const actions = Reducer.map({
  timeout: Reducer.util.timeoutActivity({
      activity: 'to_p_prepare',
      ms: 2,
      event: 'TIMEOUT',
  }),
  consoleLog: () => {
    console.log('consoleLog');
  },
  clearRequestStop: Reducer.update({ isRequested: false }),
});

export default actions;