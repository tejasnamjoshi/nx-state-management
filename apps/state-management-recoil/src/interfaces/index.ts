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
  nextUrl: string | null;
}

export interface IUserState {
  profileData: IProfile;
  userList: IUser[];
  searchText: string;
  userSearchData: IUser[];
  repositoriesData: IRepository[];
  pagination: IPagination;
}
