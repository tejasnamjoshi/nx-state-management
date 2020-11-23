import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockStore } from 'src/code/testHelpers';
import { getInitialState, IReduxState } from 'src/store/reducers/initialState';
import { IUser } from 'src/store/reducers/userReducer';

import UserList from './UserList';

const mockStoreDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockStoreDispatch
}));

beforeEach(jest.resetAllMocks);

const testUserList: IUser[] = [
  {
    avatar: 'One',
    username: 'One'
  },
  {
    avatar: 'Two',
    username: 'Two'
  }
];

const testSearchData: IUser[] = [
  {
    avatar: 'Three',
    username: 'Three'
  },
  {
    avatar: 'Four',
    username: 'Four'
  }
];

const createRenderer = (state: IReduxState = getInitialState()): RenderResult => {
  const store = createMockStore(state);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    </Provider>
  );
};

describe('<UserList />', () => {
  it('should render correctly', () => {
    const state = getInitialState();
    state.user.usersList = [...testUserList];
    const { getByText } = createRenderer(state);
    expect(getByText('One')).toBeInTheDocument();
    expect(getByText('Two')).toBeInTheDocument();
  });

  it('should render search data when searching', () => {
    const state = getInitialState();
    state.user.usersList = [...testUserList];
    state.user.userSearchData = [...testSearchData];
    state.user.searchText = 'Test';

    const { getByText, queryByText } = createRenderer(state);
    expect(getByText('Three')).toBeInTheDocument();
    expect(getByText('Four')).toBeInTheDocument();

    expect(queryByText('One')).toBeNull();
    expect(queryByText('Two')).toBeNull();
  });

  it('should dispatch fetchUsersList when component is loaded', () => {
    createRenderer();
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'FETCH_USERS_LIST'
    });
  });
});
