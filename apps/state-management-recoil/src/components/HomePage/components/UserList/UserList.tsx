import './UserList.scss';

import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { fetchUserList, fetchUserSearchData, paginationDataAtom, userListAtom } from 'src/atoms/userStateAtoms';
import { getNextUrl } from 'src/code/helpers';
import { IUser } from 'src/interfaces';

const UserList = () => {
  const setPaginationData = useSetRecoilState(paginationDataAtom);
  const resetPaginationData = useResetRecoilState(paginationDataAtom);
  const [usersData, setUserData] = useRecoilState(userListAtom);
  const resetUsersData = useResetRecoilState(userListAtom);
  const userResponse = useRecoilValue(fetchUserList);
  const nextUrl = getNextUrl(userResponse);
  const searchData = useRecoilValue(fetchUserSearchData);
  const users = searchData ?? usersData;

  const cleanup = useCallback(() => {
    resetUsersData();
    resetPaginationData();
  }, [resetUsersData, resetPaginationData]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    // * Persist data to the atom
    setUserData(current => current.concat(userResponse.data.map((user: any): IUser => ({ avatar: user.avatar_url, username: user.login }))));
  }, [setUserData, userResponse.data]);

  const handleLoadMore = () => {
    setPaginationData({ nextUrl });
  };

  return (
    <div className="UserList py-5">
      <InfiniteScroll
        hasMore={!!nextUrl}
        dataLength={users.length}
        next={handleLoadMore}
        loader={
          <p style={{ textAlign: 'center' }}>
            <b>Loading...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Nothing more to show</b>
          </p>
        }
      >
        {users.map((user, index) => (
          <div className="UserList__user p-3" key={index}>
            <Link className="d-flex align-items-center" to={`/users/${user.username}`}>
              <div className="pr-3">
                <img height={50} width={50} src={user.avatar} alt="User Avatar" />
              </div>
              <div>{user.username}</div>
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
