import { ADD, RESET, CLEAR, SORT, CARD_CLICK } from '../actions/types.js';

const RANDOM_IMAGE_PATH = 'http://lorempixel.com/400/200/';
const CARD_INITIAL_STATE = { count: 0, isMax: false, opacity: 0.0, imagePath: RANDOM_IMAGE_PATH,  };
const MAX_CARD_COUNT = 5;

// return the given array and apply a mapper fn on a filtered subset of the array
// useful when you want to transform only certain items in an array
const mapOnlyFiltered = (filter, mapper) => array => array.map(item => filter(item) ? mapper(item) : item)
// increment the state of the given card id
const updateCardCountById = (id) => mapOnlyFiltered((item) => item.id === id, (item) => ({
  ...item,
  count: Math.min(item.count + 1, MAX_CARD_COUNT),
  isMax: (item.count + 1) >= MAX_CARD_COUNT,
  opacity: (item.count + 1) / MAX_CARD_COUNT
}));

const resetCardCount = (card) => ({ ...card, ...CARD_INITIAL_STATE })


export default (state = [], action) =>
    action.type === ADD ? state.concat({ ...CARD_INITIAL_STATE, name: action.name, id: action.id }) :
    action.type === CLEAR ? [] :
    action.type === SORT ? state.slice().sort((a, b) => b.count - a.count) :
    action.type === RESET ? state.map(resetCardCount) :
    action.type === CARD_CLICK ? updateCardCountById(action.id)(state) :
    state;
