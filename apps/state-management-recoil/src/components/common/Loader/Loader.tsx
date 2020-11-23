import './Loader.scss';

import React from 'react';

const Loader = () => (
  <div className="Loader d-flex flex-column justify-content-center align-items-center">
    <div className="Loader__spinner spinner-border text-primary" role="status" />
    <h1>Loading</h1>
  </div>
);

export default Loader;
