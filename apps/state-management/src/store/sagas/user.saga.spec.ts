import axios, { AxiosError, AxiosResponse } from 'axios';
import SagaTester from 'redux-saga-tester';

import { rootReducer } from '../reducers';
import { types as errorTypes } from '../reducers/errorsReducer';
import { getInitialState, IReduxState } from '../reducers/initialState';
import { fetchUsersList, IUser, types as userTypes } from '../reducers/userReducer';
import userSaga from './user.saga';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const testUserList1 = [
  {
    avatar_url: 'One',
    login: 'One'
  },
  {
    avatar_url: 'Two',
    login: 'Two'
  }
];

const expectedTestUserList1: IUser[] = [
  {
    avatar: 'One',
    username: 'One'
  },
  {
    avatar: 'Two',
    username: 'Two'
  }
];

describe('UserSaga', () => {
  describe('fetchUsersList', () => {
    const mockResponseSuccess: Partial<AxiosResponse> = {
      headers: {
        link: '<https://api.github.com/users?since=47>; rel="next", <https://api.github.com/users{?since}>; rel="first"'
      },
      data: testUserList1,
      status: 200,
      statusText: 'Success'
    };

    const mockResponseFailure: Partial<AxiosError> = {
      code: '500',
      isAxiosError: true,
      response: {
        status: 500,
        data: {
          message: 'Testing Error'
        }
      } as any
    };

    const createSagaTester = (isSuccess: boolean) => {
      const state = { ...getInitialState() };

      const sagaTester = new SagaTester({
        initialState: state,
        reducers: rootReducer as any
      });

      expect(mockAxios.get).not.toHaveBeenCalled();

      isSuccess ? mockAxios.get.mockResolvedValue(mockResponseSuccess) : mockAxios.get.mockRejectedValue(mockResponseFailure);
      sagaTester.start(userSaga);
      sagaTester.dispatch(fetchUsersList());

      return sagaTester;
    };

    beforeEach(jest.resetAllMocks);

    it('should save data on success', async () => {
      const sagaTester = createSagaTester(true);
      expect(mockAxios.get).toHaveBeenCalled();

      await sagaTester.waitFor(userTypes.SET_PAGINATION_INFORMATION);
      await sagaTester.waitFor(userTypes.SET_USERS_LIST);

      const finalState: IReduxState = sagaTester.getState();

      expect(finalState.user.pagination).toEqual({
        hasMore: true,
        nextUrl: 'https://api.github.com/users?since=47'
      });
      expect(finalState.user.usersList).toEqual(expectedTestUserList1);
    });

    it('should add error on failure', async () => {
      const sagaTester = createSagaTester(false);
      expect(mockAxios.get).toHaveBeenCalled();

      await sagaTester.waitFor(errorTypes.SET_ERROR);
      const finalState: IReduxState = sagaTester.getState();

      expect(finalState.error).toEqual({
        code: 500,
        message: 'Testing Error'
      });
    });
  });
});
