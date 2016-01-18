import { ADD, CLEAR, CARD_CLICK, RENAMING, RENAMED, RESET } from './types.js';

let lastId = 0;

const getAddAction = () => ({ type: ADD, count: 0, id: lastId++ });
const getClearAction = () => ({ type: CLEAR });
const getResetAction = () => ({ type: RESET });
const getCardClickAction = (id) => ({ type: CARD_CLICK, id });

const getRenamingAction = () => ({ type: RENAMING });
const getRenamedAction = (newName) => ({ type: RENAMED, newName });

export {
  getAddAction,
  getClearAction,
  getCardClickAction,
  getResetAction,

  getRenamingAction,
  getRenamedAction
};
