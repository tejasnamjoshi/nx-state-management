import axios from 'axios';

import { IUserRepositoryPayload } from '../store/reducers/userReducer';

export const BASE_URL = 'https://api.github.com';

export const getUserList = (nextUrl: string | null = null) => {
  const url = nextUrl ?? `${BASE_URL}/users?since=1`;
  return axios.get(url);
};

export const searchUsers = (searchStr: string) => {
  return axios.get(`${BASE_URL}/search/users?q=${searchStr}`);
};

export const getUserProfile = (username: string) => {
  return axios.get(`${BASE_URL}/users/${username}`);
};

export const getUserRepositories = (params: IUserRepositoryPayload, nextUrl: string | null = null) => {
  const url = nextUrl ?? `${BASE_URL}/users/${params.username}/repos?sort=${params.sortParam}&page=1`;
  return axios.get(url);
};
