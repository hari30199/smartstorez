import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,Image,Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '@Auth';
import { useNavigation } from '@react-navigation/native';

const Notification = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();
  const {userInfo, logout} = useContext(AuthContext);
 
  
  return (
  
    <ScrollView style={{flex:1,backgroundColor:'#d9d9d9'}} keyboardShouldPersistTaps={'always'}>
    <View style={styles.container}>
      <View style={{width:'100%',alignItems:'center', height:200,backgroundColor:'#f8f9fa',flexDirection:'row',justifyContent:'space-around'}}>
       <View>
       <Text style={{fontSize:24,fontWeight:'bold',color:'black'}}>{userInfo.user.email}  </Text>
      <Text style={{fontSize:16,top:8,color:'#6c757d'}} >(+91){userInfo.user.phone} </Text>
      <Text style={{fontSize:16,top:8,color:'#6c757d'}}>{userInfo.user.name}  </Text>
       </View>
       <View style={{width:100,height:100}}> 
       </View>
      </View>
      <View style={styles.account}>
       <Text style={{top:30,left:26,fontWeight:'bold',color:'black'}} >My Account</Text>
       
      <View style={{flexDirection:'row',
      width:'100%',
      flexWrap:'wrap',
      left:20,
      top:30,justifyContent:'center'
      }}>
    
      </View>
    </View>
 
</View>

      <View style={{width:'100%',height:200,top:40}}>
        <View style={styles.log}>
      
    <TouchableOpacity onPress={logout}> 
          <Text style={styles. logout}><Icon name="logout"  size={14} />   Logout</Text>
      </TouchableOpacity>
 
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  welcome: {
    fontSize: 18,
    top:40,
    left:20
  },
  head:{
    bottom:120,
      width:'100%',
      height:170,
      backgroundColor:"white"
  },
  logout:{
      color:'white',
      fontWeight:'bold'
  },
  log:{
      width:'86%',
      height:50,
      backgroundColor:"#ff5959",
      justifyContent:'center',
      alignItems:'center',
      left:26,
      borderRadius:4,
      top:70,
      borderWidth:0.3,
      borderColor:'#57575730'
  },
  account:{
      width:'100%',
      // height:,
    
  },
  myacc:{
      flexDirection:'row',
      top:40,
      
  },
  options:{
  backgroundColor:'white',
  width:'26%',
  height:80,
  left:10,
  margin:10,
  fontSize:12,
  // top:20
},
option:{
backgroundColor:'white',
width:'26%',
height:80,
left:10,
margin:10,
top:70,
fontSize:12,
},
txt:{
  fontSize:12,
  fontWeight:'bold',
  top:70,
  textAlign:'center'
},
gridView: {
  marginTop: 40,
},
itemContainer: {
  justifyContent: 'flex-end',
  borderRadius: 5,
  padding: 10,
  height: 110,
  alignItems:'center',
},
itemName: {
  fontSize: 12,
  fontWeight: 'bold',
},
itemCode:{
  justifyContent:'center',
  alignItems:'center',
  bottom:10
},
avatar:{
  alignItems:'flex-end',
  right:20
},
card:{
  width:'90%',
  backgroundColor:'white',
  height:100,
  margin:5,
  borderRadius:10,
  textAlign:'center'
},
grid:{
  top:30,
  flexDirection:'row',
  width:100,
  left:20,
  height:100
},
word:{
  width:'40%',
  height:100,
  backgroundColor:'white',
  margin:14,
  justifyContent:'center',
  right:20,
  alignItems:'center',
  marginTop:30,
  borderRadius:4
},
wordtext:{
  textAlign:'center',
  fontSize:14,
  marginTop:12,
  color:'#282c3f',
  fontFamily:'FontAwesome5_Brands'
},
helpsec:{
  fontSize:16,
  // fontFamily:'FontAwesome5_Brands',
  // fontWeight:'bold'
  color:'black',
  fontWeight:'400',
  backgroundColor:'white',
  // width:170,
  padding:12,
  borderWidth:0.3,left:22,
  borderColor:'#57575730',margin:5,borderRadius:4
}

  
});

export default Notification;