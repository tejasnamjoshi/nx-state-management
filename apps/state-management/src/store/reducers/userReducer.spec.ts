import { createMockStore } from 'src/code/testHelpers';

import { getInitialState } from './initialState';
import { IUser, setSearchText, setUsersList } from './userReducer';

const defaultUserState = {
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

const testUserList1: IUser[] = [
  {
    avatar: 'One',
    username: 'One'
  },
  {
    avatar: 'Two',
    username: 'Two'
  }
];

const testUserList2: IUser[] = [
  {
    avatar: 'Three',
    username: 'Three'
  },
  {
    avatar: 'Four',
    username: 'Four'
  }
];

describe('userReducer', () => {
  it('should have the correct initialState', () => {
    const store = createMockStore();
    expect(store.getState().user).toEqual(defaultUserState);
  });

  it('should add users to the state when setUsersList action is dispatched', () => {
    const state = getInitialState();
    state.user.usersList = [...testUserList1];
    const store = createMockStore(state);
    expect(store.getState().user.usersList.length).toEqual(2);

    store.dispatch(setUsersList(testUserList2));

    expect(store.getState().user.usersList.length).toEqual(4);
  });

  describe('SetSearchText', () => {
    it('should set the search string in state when setSearchText action is dispatched', () => {
      const store = createMockStore();
      const searchText = 'Testing';
      store.dispatch(setSearchText(searchText));
      expect(store.getState().user.searchText).toEqual(searchText);
    });

    it('should clear searchData when setSearchText is passed a blank string', () => {
      const state = getInitialState();
      state.user.userSearchData = [...testUserList1];
      const store = createMockStore(state);
      const searchText = '';
      expect(store.getState().user.userSearchData.length).toEqual(2);
      store.dispatch(setSearchText(searchText));
      expect(store.getState().user.searchText).toEqual(searchText);
      expect(store.getState().user.userSearchData.length).toEqual(0);
    });
  });
});
