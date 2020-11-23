import React from 'react';

export interface IRepositoryDetails {
  icon: string;
  text: string | number;
  className?: string;
}

const RepositoryDetails = (props: IRepositoryDetails) => {
  return (
    <div className={`RepositoryDetails ${props.className ?? ''} ml-3`}>
      <i className={`${props.icon} mr-2`} />
      <span>{props.text.toString()}</span>
    </div>
  );
};

export default RepositoryDetails;
