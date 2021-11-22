import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// create store with redux-thunk middleware
const middleware= [thunk]
const store = createStore(reducer, applyMiddleware(...middleware));

export default store;