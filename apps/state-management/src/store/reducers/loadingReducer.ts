export interface ILoadingState {
  isLoading: boolean;
}

const types = {
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER'
};

type ShowLoaderAction = { type: string };
type ShowLoader = () => ShowLoaderAction;
export const showLoader: ShowLoader = () => ({ type: types.SHOW_LOADER });

type HideLoaderAction = { type: string };
type HideLoader = () => HideLoaderAction;
export const hideLoader: HideLoader = () => ({ type: types.HIDE_LOADER });

type Actions = ShowLoaderAction | HideLoaderAction;

export const initialState: ILoadingState = {
  isLoading: false
};

const loadingReducer = (state: ILoadingState = initialState, action: Actions) => {
  switch (action.type) {
    case types.SHOW_LOADER:
      return {
        ...state,
        isLoading: true
      };

    case types.HIDE_LOADER:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default loadingReducer;
