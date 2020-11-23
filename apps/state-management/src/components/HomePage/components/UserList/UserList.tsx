import './UserList.scss';

import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IReduxState } from 'src/store/reducers/initialState';
import { fetchUsersList, IUser } from 'src/store/reducers/userReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const isSearching: boolean = useSelector((s: IReduxState) => !!s.user.searchText);
  const users: IUser[] = useSelector((s: IReduxState) => (isSearching ? s.user.userSearchData : s.user.usersList));
  const hasMore = useSelector((s: IReduxState) => s.user.pagination.hasMore);

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="UserList py-5">
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={users.length}
        next={fetchUsers}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Nothing more to show</b>
          </p>
        }
      >
        {users.map((user: IUser, index: number) => (
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
