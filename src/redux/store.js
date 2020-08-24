import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import task from './reducers';
import thunk from 'redux-thunk'



const store = createStore(task, composeWithDevTools(applyMiddleware(thunk)));

export default store;