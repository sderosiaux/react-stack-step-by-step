import { combineReducers } from 'redux';

import cards from './cardsState.js';
import board from './boardState.js';

export default combineReducers({
  cards,
  board,
});
