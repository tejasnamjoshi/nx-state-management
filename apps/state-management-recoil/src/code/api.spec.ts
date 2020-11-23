import axios from 'axios';

import { BASE_URL, getUserList, getUserProfile, getUserRepositories, searchUsers } from './api';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(jest.resetAllMocks);

const TEST_BASE_URL = 'https://api.github.com';

describe('API', () => {
  it('should have correct BASE_URL', () => {
    expect(BASE_URL).toEqual(TEST_BASE_URL);
  });

  describe('getUserList', () => {
    it('should be invoked with default params when nextUrl is null', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      const expectedUrl = `${TEST_BASE_URL}/users?since=1`;
      getUserList(null);

      expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should be invoked with nextUrl when nextUrl is a valid string', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      getUserList('test');

      expect(mockAxios.get).toHaveBeenCalledWith('test');
    });
  });

  it('searchUsers', () => {
    expect(mockAxios.get).not.toHaveBeenCalled();
    searchUsers('Test');

    expect(mockAxios.get).toHaveBeenCalledWith(`${TEST_BASE_URL}/search/users?q=Test`);
  });

  it('getUserProfile', () => {
    expect(mockAxios.get).not.toHaveBeenCalled();
    getUserProfile('test');

    expect(mockAxios.get).toHaveBeenCalledWith(`${TEST_BASE_URL}/users/test`);
  });

  describe('getUserRepositories', () => {
    const username = 'testUserName';
    it('should be invoked with the base url when nextURL is not available', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      const expectedUrl = `${TEST_BASE_URL}/users/${username}/repos?sort=pushed&page=1`;
      getUserRepositories({ username, sortParam: 'pushed' }, null);

      expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should be invoked with nextUrl when nextUrl is a valid string', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      const nextUrl = 'test';
      getUserRepositories({ username, sortParam: 'pushed' }, nextUrl);

      expect(mockAxios.get).toHaveBeenCalledWith(nextUrl);
    });
  });
});
