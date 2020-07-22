import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import Reducer from './Reducer/Reducer';
import Main from './Components/Main';
import * as LS from 'local-storage';

const App = () => {
  const store = createStore(Reducer);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
