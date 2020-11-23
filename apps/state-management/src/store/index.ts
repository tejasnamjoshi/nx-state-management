import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import initialState from './reducers/initialState';
import userSaga from './sagas/user.saga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(userSaga);

  return store;
}
