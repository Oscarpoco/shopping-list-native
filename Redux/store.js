import { createStore } from 'redux';
import shoppingReducer from './reducer.js';

const store = createStore(shoppingReducer);

export default store;