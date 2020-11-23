import React from 'react';
import { RecoilRoot } from 'recoil';

import Error from './components/common/Error';
import Routes from './routes';

const App = () => {
  return (
    <div className="App">
      <Error>
        <RecoilRoot>
          <div className="container-fluid py-4">
            <Routes />
          </div>
        </RecoilRoot>
      </Error>
    </div>
  );
};

export default App;
