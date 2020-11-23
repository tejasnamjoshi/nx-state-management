export interface IUser {
  avatar: string;
  username: string;
}

export interface IProfile {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  repositories: number;
}

export interface IRepository {
  name: string;
  language: string;
  stargazers_count: string;
  forks_count: number;
  html_url: string;
  description: string;
}

export interface IPagination {
  hasMore: boolean;
  nextUrl: string | null;
}

export interface IUserState {
  profileData: IProfile;
  usersList: IUser[];
  searchText: string;
  userSearchData: IUser[];
  repositoriesData: IRepository[];
  pagination: IPagination;
}

export interface IUserRepositoryPayload {
  username: string;
  sortParam: string;
}

export const types = {
  FETCH_USERS_LIST: 'FETCH_USERS_LIST',
  SET_USERS_LIST: 'SET_USERS_LIST',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  FETCH_USER_SEARCH_DATA: 'FETCH_USER_SEARCH_DATA',
  SET_USER_SEARCH_DATA: 'SET_USER_SEARCH_DATA',
  FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  FETCH_USER_REPOSITORIES: 'FETCH_USER_REPOSITORIES',
  SET_USER_REPOSITORIES: 'SET_USER_REPOSITORIES',
  CLEAR_USER_REPOSITORIES: 'CLEAR_USER_REPOSITORIES',
  SORT_USER_REPOSITORIES: 'SORT_USER_REPOSITORIES',
  SET_PAGINATION_INFORMATION: 'SET_PAGINATION_INFORMATION'
};

type FetchUsersListAction = { type: string };
type FetchUsersList = () => FetchUsersListAction;
export const fetchUsersList: FetchUsersList = () => ({
  type: types.FETCH_USERS_LIST
});

type SetUsersListAction = { type: string; payload: IUser[] };
type SetUsersList = (users: IUser[]) => SetUsersListAction;
export const setUsersList: SetUsersList = users => ({
  type: types.SET_USERS_LIST,
  payload: users
});

type SetUserSearchDataAction = { type: string; payload: IUser[] };
type SetUserSearchData = (users: IUser[]) => SetUserSearchDataAction;
export const setUserSearchData: SetUserSearchData = users => ({
  type: types.SET_USER_SEARCH_DATA,
  payload: users
});

export type FetchUserSearchDataAction = { type: string; payload: string };
export type FetchUserSearchData = (searchText: string) => FetchUserSearchDataAction;
export const fetchUserSearchData: FetchUserSearchData = searchText => ({
  type: types.FETCH_USER_SEARCH_DATA,
  payload: searchText
});

export type SetSearchTextAction = { type: string; payload: string };
export type SetSearchText = (searchText: string) => SetSearchTextAction;
export const setSearchText: SetSearchText = searchText => ({
  type: types.SET_SEARCH_TEXT,
  payload: searchText
});

export type FetchUserProfileAction = { type: string; payload: string };
type FetchUserProfile = (username: string) => FetchUserProfileAction;
export const fetchUserProfile: FetchUserProfile = username => ({
  type: types.FETCH_USER_PROFILE,
  payload: username
});

export type SetUserProfileAction = { type: string; payload: IProfile };
type SetUserProfile = (profile: IProfile) => SetUserProfileAction;
export const setUserProfile: SetUserProfile = profile => ({
  type: types.SET_USER_PROFILE,
  payload: profile
});

export type FetchUserRepositoriesAction = { type: string; payload: IUserRepositoryPayload };
export type FetchUserRepositories = (params: IUserRepositoryPayload) => FetchUserRepositoriesAction;
export const fetchUserRepositories: FetchUserRepositories = params => ({
  type: types.FETCH_USER_REPOSITORIES,
  payload: params
});

export type SetUserRepositoriesAction = { type: string; payload: IRepository[] };
type SetUserRepositories = (repositories: IRepository[]) => SetUserRepositoriesAction;
export const setUserRepositories: SetUserRepositories = repositories => ({
  type: types.SET_USER_REPOSITORIES,
  payload: repositories
});

export type ClearRepositoryDataAction = { type: string };
type ClearRepositoryData = () => ClearRepositoryDataAction;
export const clearRepositoryData: ClearRepositoryData = () => ({
  type: types.CLEAR_USER_REPOSITORIES
});

export type SetPaginationInformationAction = { type: string; payload: IPagination };
type SetPaginationInformation = (pagination: IPagination) => SetPaginationInformationAction;
export const setPaginationInformation: SetPaginationInformation = pagination => ({
  type: types.SET_PAGINATION_INFORMATION,
  payload: pagination
});

export const clearPaginationData = () => setPaginationInformation({ ...initialState.pagination });

export const initialState: IUserState = {
  profileData: {
    avatar_url: '',
    name: '',
    login: '',
    location: '',
    blog: '',
    followers: 0,
    following: 0,
    repositories: 0
  },
  usersList: [],
  searchText: '',
  userSearchData: [],
  repositoriesData: [],
  pagination: {
    hasMore: false,
    nextUrl: null
  }
};

type Actions = SetUsersListAction | FetchUserSearchDataAction | SetUserSearchDataAction | SetUserProfileAction | SetUserRepositoriesAction;

const userReducer = (state: IUserState = initialState, action: Actions) => {
  const { payload } = action;

  switch (action.type) {
    case types.SET_USERS_LIST:
      return {
        ...state,
        usersList: [...state.usersList, ...(payload as IUser[]).map((user: any) => ({ avatar: user.avatar_url, username: user.login }))]
      };

    case types.SET_SEARCH_TEXT:
      if (!payload) {
        return {
          ...state,
          searchText: payload as string,
          userSearchData: []
        };
      }

      return {
        ...state,
        searchText: payload as string
      };

    case types.SET_USER_SEARCH_DATA:
      return {
        ...state,
        userSearchData: (payload as IUser[]).map((user: any) => ({ avatar: user.avatar_url, username: user.login }))
      };

    case types.SET_USER_PROFILE:
      return {
        ...state,
        profileData: payload as IProfile
      };

    case types.SET_USER_REPOSITORIES:
      return {
        ...state,
        repositoriesData: [...state.repositoriesData, ...(action.payload as IRepository[])]
      };

    case types.CLEAR_USER_REPOSITORIES:
      return {
        ...state,
        repositoriesData: initialState.repositoriesData
      };

    case types.SET_PAGINATION_INFORMATION:
      return {
        ...state,
        pagination: payload
      };

    default:
      return state;
  }
};

export default userReducer;
