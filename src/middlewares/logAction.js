export default ({ /* getState */ }) => next => action => { console.log('action', action); return next(action); };
