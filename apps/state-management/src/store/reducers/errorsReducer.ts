export interface IError {
  message: string;
  code: number | undefined;
}

export const types = {
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

type SetErrorAction = { type: string; payload: IError };
type SetError = (error: IError) => SetErrorAction;
export const setError: SetError = error => ({
  type: types.SET_ERROR,
  payload: error
});

export const clearError = (): SetErrorAction => setError(initialState);

type Actions = SetErrorAction;

export const initialState: IError = {
  message: '',
  code: undefined
};

const errorsReducer = (state: IError = initialState, action: Actions) => {
  if (action.type === types.SET_ERROR) {
    return { ...state, ...action.payload };
  }

  return state;
};

export default errorsReducer;
