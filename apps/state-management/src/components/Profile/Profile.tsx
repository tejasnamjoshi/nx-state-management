import './Profile.scss';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from 'src/store/reducers/userReducer';

import ProfileDetails from './components/ProfileDetails';
import Repositories from './components/Repositories';

export interface IParams {
  username: string
}

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams<IParams>();

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  return (
    <div className="Profile d-flex">
      <div className="mr-4">
        <ProfileDetails />
      </div>
      <div className="flex-grow-1">
        <Repositories />
      </div>
    </div>
  );
};

export default Profile;
