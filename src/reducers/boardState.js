import { RENAMING, RENAMED, SORT, ADD, VOTE } from '../actions/types.js';

const DEFAULT_BOARD_STATE = { name: 'My board', isRenaming: false, hasChanged: false };

export default (state = DEFAULT_BOARD_STATE, action) =>
  action.type === SORT ? { ...state, hasChanged: false } :
  action.type === RENAMING ? { ...state, isRenaming: true } :
  action.type === RENAMED ? { ...state, isRenaming: false, name: action.newName } :
  // we "watch" for VOTE (card action)  because it has impact on the board state
  action.type === VOTE ? { ...state, hasChanged: true } :
  state;
