import 'react-native-gesture-handler';
import React,{useContext} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../Authentication/Authcontext';
import Navigationstack from './Navigationstack';
import Cart from '@screens/Cart';
import Categories from '@screens/Categories';
import Search from '@screens/Search';
import Account from '@screens/Account';
import Profilescreen from '@screens/Profilescreen';
import Home from '@screens/Home';



const BottomBar = createBottomTabNavigator();

export default function TabBar({barColor}) {
  const {userInfo} = useContext(AuthContext);
  
  const routes = useNavigationState(state => state.routes);

  const currentRouteIndex =
    routes?.length && routes[routes.length - 1].state?.index;
  const currentRoute =
    routes[routes.length - 1].state?.routeNames[currentRouteIndex];
  
  // console.log('Current Route: ', currentRoute);

  return (
    <BottomBar.Navigator
      tabBar={props => (
        <View style={styles.navigatorContainer}>
          {currentRoute == 'Cart'? (<Text></Text>):(
            <BottomTabBar {...props} />
          )}
          
        </View>
      )}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showIcon: true,
        style: styles.navigator,
        tabStyle: {
          backgroundColor: 'white',
          borderRadius: 10,
          paddingBottom:3,
          paddingTop:4
        },
      }}>
      <BottomBar.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <AntDesign name="home" color={color} size={26} />,
          headerShown: false,
        }}
      />
      <BottomBar.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="list" color={color} size={24} />
          ),
        }}
      />

   
      <BottomBar.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="md-search-outline" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
         <BottomBar.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="cart-outline" color={color} size={24} />
          ),
        }}
      />
      {userInfo.access_token? 
      (
        <BottomBar.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      ):(
        <BottomBar.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      ) }
     

    

    </BottomBar.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 10,
    width: '94%',
    alignSelf: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  navigator: {
    backgroundColor: 'white',
    elevation: 6,
    borderRadius: 10,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
