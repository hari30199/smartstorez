import React ,{useContext,useState,useEffect}from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/Home';
import Categories from '@screens/Categories';
import Alert from '@screens/Alert';
import Cart from '@screens/Cart';
import Account from '@screens/Account';
import Productdetail from '@screens/Productdetail';
import Reviews from '@screens/Reviews';
import Register from '@screens/Register'
import Bottomtab from '@navigation/Bottomtab';
import Productsscreen from '@screens/Productsscreen';
import Brands from '@screens/Brands'

const Stack = createStackNavigator();

const Navigationstack = () => {
 
  return (
      // <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="home"  component={Bottomtab} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Login" component={Account} />
            <Stack.Screen name="Productdetail" component={Productdetail} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Productsscreen" component={Productsscreen} />
            <Stack.Screen name="Brands" component={Brands} />
      </Stack.Navigator> 
  );
};

export default Navigationstack;

 