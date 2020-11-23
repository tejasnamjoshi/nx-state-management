import './Loader.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'src/store/reducers/initialState';

const Loader = () => {
  const isLoading: boolean = useSelector((s: IReduxState) => s.loader.isLoading);
  if (!isLoading) return null;

  return (
    <div className="Loader d-flex flex-column justify-content-center align-items-center">
      <div className="Loader__spinner spinner-border text-primary" role="status" />
      <h1>Loading</h1>
    </div>
  );
};

export default Loader;
