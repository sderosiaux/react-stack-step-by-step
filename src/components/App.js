import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import logState from '../middlewares/logState.js';
import logAction from '../middlewares/logAction.js';
import boardStateReducer from '../reducers/boardState.js';

import Board from './Board.js';

const STYLE_APP = { color: 'black', fontFamily: 'Roboto', padding: 100 };

const storeEnhancer = applyMiddleware(logState, logAction);
const createEnhancedStore = storeEnhancer(createStore);
const store = createEnhancedStore(boardStateReducer);

// The store will injected into the React context.
// To get it back, components must be wrapped with : connect()(Component)
export default () =>
  <div style={STYLE_APP}>
    <Provider store={store}>
      <Board />
    </Provider>
  </div>;
