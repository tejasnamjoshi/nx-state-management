import { createStore, Store } from 'redux';

import reducers from '../store/reducers';
import { getInitialState, IReduxState } from '../store/reducers/initialState';

export const createMockStore = (state: any = getInitialState()): Store<IReduxState> => {
  return createStore(reducers, state);
};
