import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import { IReduxState } from './initialState';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

export const rootReducer: any = {
  user: userReducer,
  loader: loadingReducer,
  error: errorsReducer
};

export default combineReducers<IReduxState>(rootReducer);
