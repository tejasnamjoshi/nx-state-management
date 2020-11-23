import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'src/code/helpers';
import { IReduxState } from 'src/store/reducers/initialState';
import { clearPaginationData, fetchUserSearchData, setSearchText } from 'src/store/reducers/userReducer';

import Input from '../common/Input';
import UserList from './components/UserList';

const HomePage = () => {
  const dispatch = useDispatch();
  const searchText = useSelector<IReduxState, string>(s => s.user.searchText);
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(fetchUserSearchData(value));
    }),
    []
  );

  useEffect(() => {
    return () => {
      dispatch(clearPaginationData());
    };
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { value: searchText } = event.target;
    dispatch(setSearchText(searchText));
    debouncedSearch(searchText);
  };

  return (
    <div className="HomePage">
      <Input onChange={handleSearch} inputText={searchText} placeholder="Username" />
      <UserList />
    </div>
  );
};

export default HomePage;
