import { ADD, SORT, CARD_CLICK } from './types.js';

let lastId = 0;

const getAddAction = () => ({ type: ADD, count: 0, id: lastId++ });
const getSortAction = () => ({ type: SORT });
const getCardClick = (id) => ({ type: CARD_CLICK, id });

export {
  getAddAction,
  getSortAction,
  getCardClick
};
