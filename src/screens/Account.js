import React, {useContext, useState,useEffect} from 'react';
import {ScrollView,KeyboardAvoidingView,Text,TextInput,TouchableOpacity,View,StyleSheet,Image}from 'react-native';

import {AuthContext} from '../Authentication/Authcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@constants/Constants';

const LoginScreen = ({navigation,route}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login} = useContext(AuthContext);
  const [errormsg, seterrormsg] = useState('');
  const [erroremailmsg, seterroremailmsg] = useState('');
  const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');
  const emailmatch = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  const passwordmatch = /^.*(?=.{8,})/


 
  const submit = () => {
    if (email == null || password == null)
    return seterroremailmsg ('Enter your valid Email '), seterrormatchpassmsg('Password must contain atleat 8 characters')
    else if (!emailmatch.test(email))
    return seterrormsg ('Enter your valid Email ')
    else if (!passwordmatch.test(password))
    return seterrormatchpassmsg('Password must contain atleat 8 characters')
    else
    return login(email, password)
    }


//     <View style={{width:'50%'}}>
//     <Text style={styles.login}>LOGIN</Text>
//     <Text style={styles.log}>Enter your email and password</Text>
// </View>

  return (
    <View style={styles.container}>
       <ScrollView keyboardShouldPersistTaps={'always'}>
      <View style={styles.head}>
          <View style={{flexDirection:'row',height:155}}>
          <Image />
               <View style={{width:'50%'}}>
     <Text style={styles.login}>LOGIN</Text>
     <Text style={styles.log}>Enter your email and password</Text>
 </View>
       </View>
      </View>
      
      <View style={styles.wrapper}>
      <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "height"}
         >
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text=>setEmail(text)}
          maxLength = {50}
        />
        <View style={{bottom:6}}>
         <Text>{!emailmatch.test(email) ? (<Text style={styles.errormsg}>{erroremailmsg}{errormsg}</Text>):(<Text></Text>) }</Text>
         </View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
          maxLength = {25}
        />
        </KeyboardAvoidingView>
        <View style={{bottom:8}}>
        <Text>{ passwordmatch.test(password)? (<Text></Text>):( <Text style={[styles.errormsg,{bottom:10}]}>{errorpassmatchmsg}</Text>) }</Text>
        </View>
            <TouchableOpacity onPress={()=>submit()}>
              
            <Text style={styles.button}>Login </Text>
            </TouchableOpacity>
              <View style={styles.orcontainer}>
                <View style={styles.line}></View>
              <Text style={styles.or}>  OR  </Text>
              <View style={styles.line}></View>
              </View>
              
            <View style={{top:10,alignItems:'center'}}>

            <TouchableOpacity style={styles.socilabutton}
              >
              <View style={{flexDirection:'row'}}>
              <Text>Login in with Google</Text>
              </View>
              </TouchableOpacity>
          </View>
            <View style={styles.body}>
            <View style={styles.sectionContainer}>
            </View>
          </View>
        <View style={{flexDirection: 'row', marginTop: 44,justifyContent:'center'}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register',{
            fromlogin : 4001
          })}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20,justifyContent:'center'}}>
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.link}>ForgetPassword ?</Text>
          </TouchableOpacity>
        </View>
      </View>
      
   
      </ScrollView> 
     
    </View>
   
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  wrapper: {
    width: '80%',
    top:50,
    left:40,
    height:570
  },
  input: {
    width:'100%',
    borderRadius:6,
    marginBottom:12,
    height:56,
    paddingLeft:30,
    backgroundColor:'white'
  },
  link: {
    color: colors.primarycolor,
    
  },
  button:{
    backgroundColor:colors.primarycolor,
        height:44,
        textAlign:'center',
        color:colors.white,
        borderRadius:5,
        paddingTop:12,
        fontWeight:'bold',
        fontSize:16
  },
  login: {
    top: 80,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    left: 16,
    fontFamily: 'Segoe UI',
  },
  log: {
    top: 90,
    left: 16,
  },
  head:{
    backgroundColor:'white',
    width:'100%',
    height:200,
    },
    errormsg:{
      color:'red',textAlign:'center',left:10
    },
    orcontainer:{
      flexDirection:'row',justifyContent:'center'
    },
    line:{
      width:30,top:5,borderBottomColor:'grey',borderBottomWidth:0.3
    },
    or:{
      textAlign:'center',top:13,fontWeight:'300',color:'grey'
    },
    socilabutton:{
      top:14,borderWidth:0.3,padding:10,borderRadius:5,backgroundColor:'white',borderColor:'#57575730'
    }
});

export default LoginScreen