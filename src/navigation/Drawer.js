import * as React from 'react';
import { View, Text, Button ,Image} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Bottomtab from '@navigation/Bottomtab';
import Cart from '@screens/Cart'
import Alert from '@screens/Alert'
import Categories from '@screens/Categories';
import Brands from '@screens/Brands';
import Images from '@constants/Images';
import {NavigationContainer} from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import Navigationstack from '../navigation/Navigationstack'



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <LinearGradient colors={['#dde1ec', '#eef0f2', '#ffffff']}>
       <View style={{height:150 ,justifyContent:'center'}} >
      <Image resizeMode='cover' style={{width:'100%',height:65}} source={Images.logo}/>
      </View> 
      </LinearGradient>
      
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function SideDrawer() {
  return (
   
    <NavigationContainer>
    <Drawer.Navigator
      useLegacyImplementation 
      drawerType="slide"
      drawerContent={(props) => 
      <CustomDrawerContent {...props}/>
    }
      screenOptions={{headerShown: false}}
    
    >
      <Drawer.Screen name="Home" component={Navigationstack}/>
      <Drawer.Screen name="Flash Sale" component={Cart}   
      // options={{
      //      drawerIcon: ({focused, size}) => (
      //         <Ionicons
      //            name="md-home"
      //           //  size={size}
      //            color={focused ? '#7cc' : '#ccc'}
      //         />
      //      ),
      //   }}
         />
      <Drawer.Screen name="Blogs" component={Alert} />
      <Drawer.Screen name="All Brands" component={Brands} />
      <Drawer.Screen name="All categories" component={Categories} />
      {/* <Drawer.Screen name="Notifications" component={Notifications} /> */}
    </Drawer.Navigator>
   </NavigationContainer>
  );
}

export default SideDrawer
