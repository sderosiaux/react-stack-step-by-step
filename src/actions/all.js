import { ADD, CLEAR, SORT, RESET, VOTE, RENAMING, RENAMED } from './types.js';

let lastId = 0;

const getAddAction = () => ({ type: ADD, count: 0, id: lastId++ });
const getClearAction = () => ({ type: CLEAR });
const getResetAction = () => ({ type: RESET });
const getSortAction = () => ({ type: SORT });
const getVoteAction = (id) => ({ type: VOTE, id });

const getRenamingAction = () => ({ type: RENAMING });
const getRenamedAction = (newName) => ({ type: RENAMED, newName });

export {
  getAddAction,
  getClearAction,
  getVoteAction,
  getResetAction,
  getSortAction,

  getRenamingAction,
  getRenamedAction
};
