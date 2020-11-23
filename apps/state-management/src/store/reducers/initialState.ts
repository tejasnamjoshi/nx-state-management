import cloneDeep from 'lodash/cloneDeep';

import { IError, initialState as errorState } from './errorsReducer';
import { ILoadingState, initialState as loaderState } from './loadingReducer';
import { initialState as userState, IUserState } from './userReducer';

export interface IReduxState {
  user: IUserState;
  loader: ILoadingState;
  error: IError;
}

const initialState: IReduxState = {
  user: userState,
  loader: loaderState,
  error: errorState
};

export const getInitialState = () => cloneDeep(initialState);

export default initialState;
