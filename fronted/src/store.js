import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export function configureStore() {
  // TODO: use this to enable dev tools
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
