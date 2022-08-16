import React,{useContext} from 'react';
import {Text} from 'react-native';
import Drawer from '@navigation/Drawer';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import {AuthProvider} from './src/Authentication/Authcontext';



const App = () => {
  return (
    
      <Provider store={store}>
        <AuthProvider>
        <Drawer/>
        </AuthProvider>
      </Provider>
 
  );
};

export default App;
