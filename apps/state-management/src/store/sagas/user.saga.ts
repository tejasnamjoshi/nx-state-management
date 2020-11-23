import { AxiosError, AxiosResponse } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getUserList, getUserProfile, getUserRepositories, searchUsers } from 'src/code/api';

import { setError } from '../reducers/errorsReducer';
import { IReduxState } from '../reducers/initialState';
import { hideLoader, showLoader } from '../reducers/loadingReducer';
import {
  FetchUserProfileAction,
  FetchUserRepositoriesAction,
  FetchUserSearchDataAction,
  IPagination,
  setPaginationInformation,
  setUserProfile,
  setUserRepositories,
  setUserSearchData,
  setUsersList,
  types as userTypes
} from '../reducers/userReducer';

var parse = require('parse-link-header');

function* setPaginationData(response: AxiosResponse) {
  const linkHeader: string = response.headers.link || '';
  var parsed = parse(linkHeader);
  const pagination: IPagination = {
    hasMore: !!parsed?.next,
    nextUrl: parsed?.next?.url
  };
  yield put(setPaginationInformation(pagination));
}

function* dispatchError(error: AxiosError) {
  const { response } = error;
  yield put(setError({ code: response?.status, message: response?.data.message }));
  yield put(hideLoader());
}

function* fetchUsersList() {
  try {
    const nextUrl: string = yield select((s: IReduxState) => s.user.pagination.nextUrl);

    yield put(showLoader());
    const response = yield call(getUserList, nextUrl);
    yield call(setPaginationData, response);
    yield put(setUsersList(response.data));

    yield put(hideLoader());
  } catch (error) {
    yield call(dispatchError, error);
  }
}

function* fetchUserSearchData(action: FetchUserSearchDataAction) {
  if (!action.payload) {
    return;
  }
  try {
    yield put(showLoader());

    const response = yield call(searchUsers, action.payload);
    yield put(setUserSearchData(response.data.items));

    yield put(hideLoader());
  } catch (error) {
    yield call(dispatchError, error);
  }
}

function* fetchUserProfile(action: FetchUserProfileAction) {
  try {
    yield put(showLoader());

    const response = yield call(getUserProfile, action.payload);
    yield put(setUserProfile(response.data));

    yield put(hideLoader());
  } catch (error) {
    yield call(dispatchError, error);
  }
}

function* fetchUserRepositories(action: FetchUserRepositoriesAction) {
  try {
    const nextUrl: string = yield select((s: IReduxState) => s.user.pagination.nextUrl);
    yield put(showLoader());

    const response = yield call(getUserRepositories, action.payload, nextUrl);
    yield call(setPaginationData, response);
    yield put(setUserRepositories(response.data));

    yield put(hideLoader());
  } catch (error) {
    yield call(dispatchError, error);
  }
}

export default function* userSaga() {
  yield takeEvery(userTypes.FETCH_USERS_LIST, fetchUsersList);
  yield takeEvery(userTypes.FETCH_USER_SEARCH_DATA, fetchUserSearchData);
  yield takeEvery(userTypes.FETCH_USER_PROFILE, fetchUserProfile);
  yield takeEvery(userTypes.FETCH_USER_REPOSITORIES, fetchUserRepositories);
}
