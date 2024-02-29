import React from 'react';
import { store, persistor } from './source/redux/Store/index';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigation from './source/navigation/MainNavigation';

function App() {

 

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate> 
    </Provider>
  );
}

export default App;
