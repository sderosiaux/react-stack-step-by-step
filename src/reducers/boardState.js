import { RENAMING, RENAMED } from '../actions/types.js';

export default (state = { name: 'My board', isRenaming: false }, action) =>
  action.type === RENAMING ? { ...state, isRenaming: true } :
  action.type === RENAMED ? { ...state, isRenaming: false, name: action.newName } :
  state;
