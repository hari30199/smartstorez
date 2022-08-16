import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../constants/Constants';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {ConstantClass} from '../constants/Constants';

export const AuthContext = createContext();

export const AuthProvider = ({children, props}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/auth/signup?name=${name}&email_or_phone=${email}&password=${password}`,
        {
          name,
          email,
          password,
        },
      )
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        // if(userInfo.message == 'User already exists.')
        // return alert ('Email or Phone already exists')
        // console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${baseURL}/auth/login?email=${email}&password=${password}`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        ConstantClass.token = userInfo.access_token;
        setIsLoading(false);
        if (userInfo.data == 'DONOTMATCH')
          return alert('Email and Password mismatch');
        // if (errorms == 'hello')
        // return alert ('hello')
        // alert(userInfo.data);
      })
      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };
  //  ---------Google login--------- //
  const logout = () => {
    ConstantClass.token = '';
    setIsLoading(true);

    axios
      .get(
        `${baseURL}/api/v2/auth/logout`,

        {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
          },
        },
      )
      .then(res => {
        // console.log(res);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
