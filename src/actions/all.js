import { ADD, CLEAR, SORT, RESET, CARD_CLICK, RENAMING, RENAMED } from './types.js';

let lastId = 0;

const getAddAction = () => ({ type: ADD, count: 0, id: lastId++ });
const getClearAction = () => ({ type: CLEAR });
const getResetAction = () => ({ type: RESET });
const getSortAction = () => ({ type: SORT });
const getCardClickAction = (id) => ({ type: CARD_CLICK, id });

const getRenamingAction = () => ({ type: RENAMING });
const getRenamedAction = (newName) => ({ type: RENAMED, newName });

export {
  getAddAction,
  getClearAction,
  getCardClickAction,
  getResetAction,
  getSortAction,

  getRenamingAction,
  getRenamedAction
};
