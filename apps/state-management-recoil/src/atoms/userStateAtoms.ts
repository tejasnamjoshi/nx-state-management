import { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';
import { getUserList, getUserProfile, getUserRepositories } from 'src/code/api';

import { searchUsers } from '../code/api';
import { IProfile, IUser, IUserState } from '../interfaces';

/* ******************* INITIAL STATE ********************* */

// * Just for convience.
export const initialUserState: IUserState = {
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
  userList: [],
  searchText: '',
  userSearchData: [],
  repositoriesData: [],
  pagination: {
    nextUrl: null
  }
};
/* ******************************************************* */

/********************* SELECTORS *************************/

export const fetchUserList = selector({
  key: 'fetchUserList',
  get: ({ get }) => {
    const { nextUrl } = get(paginationDataAtom);
    return getUserList(nextUrl);
  }
});

export const fetchUserRepositories = selector({
  key: 'fetchUserRepositories',
  get: ({ get }) => {
    const username = get(userWithUsernameAtom);
    const { nextUrl } = get(paginationDataAtom);
    const sortParam = get(repositorySortParamAtom);
    return getUserRepositories({ username, sortParam, nextUrl });
  }
});

export const fetchUserProfile = selector<IProfile>({
  key: 'fetchUserProfile',
  get: async ({ get }) => {
    try {
      const username = get(userWithUsernameAtom);
      const response: AxiosResponse<IProfile> = await getUserProfile(username);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  set: ({ set }, newValue) => {
    set(profileStateAtom, newValue);
  }
});

export const fetchUserSearchData = selector({
  key: 'fetchUserSearchData',
  get: async ({ get }) => {
    const searchText = get(userSearchTextAtom);
    if (!searchText) return null;

    try {
      const response: AxiosResponse<{ items: any[] }> = await searchUsers(searchText);
      return response.data.items.map((user: any): IUser => ({ avatar: user.avatar_url, username: user.login }));
    } catch (error) {
      throw error;
    }
  }
});

/* ************************************************************************ */

/* ******************************ATOMS************************************* */

export const userListAtom = atom({
  key: 'usersList',
  default: initialUserState.userList
});

export const profileStateAtom = atom({
  key: 'profileData',
  default: initialUserState.profileData
});

export const repositoryStateAtom = atom({
  key: 'repositoryStateAtom',
  default: initialUserState.repositoriesData
});

export const paginationDataAtom = atom({
  key: 'paginationDataAtom',
  default: initialUserState.pagination
});

export const userSearchTextAtom = atom({
  key: 'userSearchTextAtom',
  default: initialUserState.searchText
});

export const userWithUsernameAtom = atom({
  key: 'userWithUsernameAtom',
  default: ''
});

export const repositorySortParamAtom = atom({
  key: 'repositorySortParamAtom',
  default: 'pushed'
});

/* ******************************************************************* */
