export default ({ getState }) => next => action => { console.log('state', getState()); return next(action); };
