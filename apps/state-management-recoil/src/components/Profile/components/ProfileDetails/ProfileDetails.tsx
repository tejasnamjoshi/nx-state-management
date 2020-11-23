import './ProfileDetails.scss';

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchUserProfile } from 'src/atoms/userStateAtoms';

const ProfileDetails = () => {
  const [profileData, setProfileData] = useRecoilState(fetchUserProfile);

  useEffect(() => {
    // * Persist data to the atom
    setProfileData(profileData);
  }, [profileData, setProfileData]);

  return (
    <div className="ProfileDetails">
      <img className="ProfileDetails__avatar pb-3" src={profileData.avatar_url} alt={profileData.login} width={260} height={260} />
      <h1 className="ProfileDetails__name m-0">{profileData.name}</h1>
      <span className="ProfileDetails__login">{profileData.login}</span>
      <div className="ProfileDetails__stats align-items-center d-flex mt-2 mb-4">
        <i className="fa fa-users mr-3" />
        <div className="mr-1">
          <b>{profileData.following}</b>
          <span> Following</span>
        </div>
        &bull;
        <div className="ml-1">
          <b>{profileData.followers}</b>
          <span> Followers</span>
        </div>
      </div>

      <div>
        <i className="fa fa-map-marker mr-2" />
        <span>{profileData.location}</span>
      </div>
    </div>
  );
};

export default ProfileDetails;
