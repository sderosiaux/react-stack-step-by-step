import { ADD, SORT, CARD_CLICK } from '../actions/types.js';


const update = (filter, mapper) => array => array.map(item => filter(item) ? mapper(item) : item)
const updateCountById = (id) => update((item) => item.id === id, (item) => ({ ...item, count: item.count + 1 }));

export default (state = [], action) =>
    action.type === ADD ? [{ name: action.name , count: 0, imagePath: 'http://lorempixel.com/400/200/', id: action.id }].concat(state) :
    action.type === SORT ? state.slice().sort(() => Math.random() - 0.5) :
    action.type === CARD_CLICK ? updateCountById(action.id)(state) :
    state;
