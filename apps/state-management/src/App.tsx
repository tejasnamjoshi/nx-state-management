import React from 'react';
import { Provider } from 'react-redux';

import Error from './components/common/Error';
import Loader from './components/common/Loader';
import Routes from './routes';
import configureStore from './store';

const App = () => {
  const store = configureStore();
  return (
    <div className="App">
      <Provider store={store}>
        <Loader />
        <Error />
        <div className="container-fluid py-4">
          <Routes />
        </div>
      </Provider>
    </div>
  );
};

export default App;
