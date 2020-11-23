import './Profile.scss';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userWithUsernameAtom } from 'src/atoms/userStateAtoms';

import Loader from '../common/Loader';
import ProfileDetails from './components/ProfileDetails';
import Repositories from './components/Repositories';

export interface IParams {
  username: string;
}

const Profile = () => {
  const { username } = useParams<IParams>();
  const [selectedUsername, setUsername] = useRecoilState(userWithUsernameAtom);
  const resetUsername = useResetRecoilState(userWithUsernameAtom);

  useEffect(() => {
    setUsername(username);
  }, [resetUsername, setUsername, username]);

  useEffect(() => resetUsername, [resetUsername]);

  if (!selectedUsername) return null;

  return (
    <div className="Profile d-flex">
      <React.Suspense fallback={<Loader />}>
        <div className="mr-4">
          <ProfileDetails />
        </div>
        <div className="flex-grow-1">
          <Repositories />
        </div>
      </React.Suspense>
    </div>
  );
};

export default Profile;
