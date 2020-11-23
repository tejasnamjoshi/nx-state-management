import { Input } from '@react-apps/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userSearchTextAtom } from 'src/atoms/userStateAtoms';
import { debounce } from 'src/code/helpers';
import { IUserState } from 'src/interfaces';

import Loader from '../common/Loader';
import UserList from './components/UserList';

const HomePage = () => {
  const [searchText, setSearchText] = useState<IUserState['searchText']>('');
  const setFetchSearchText = useSetRecoilState(userSearchTextAtom);
  const resetFetchSearchText = useResetRecoilState(userSearchTextAtom);
  const debouncedSearch = useCallback(
    debounce((value: string) => setFetchSearchText(value)),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: searchText } = event.target;
    setSearchText(searchText);
    debouncedSearch(searchText);
  };

  useEffect(() => {
    return resetFetchSearchText;
  }, [resetFetchSearchText]);

  return (
    <div className="HomePage">
      <React.Suspense fallback={<Loader />}>
        <Input
          onChange={handleSearch}
          inputText={searchText}
          placeholder="Username"
        />
        <UserList />
      </React.Suspense>
    </div>
  );
};

export default HomePage;
