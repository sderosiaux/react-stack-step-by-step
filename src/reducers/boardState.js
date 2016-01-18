import { RENAMING, RENAMED } from '../actions/types.js';

const DEFAULT_BOARD_STATE = { name: 'My board', isRenaming: false };

export default (state = DEFAULT_BOARD_STATE, action) =>
  action.type === RENAMING ? { ...state, isRenaming: true } :
  action.type === RENAMED ? { ...state, isRenaming: false, name: action.newName } :
  state;
