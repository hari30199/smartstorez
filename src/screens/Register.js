import React, {useContext, useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../Authentication/Authcontext';
import {colors} from '@constants/Constants';

const RegisterScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);
  const [erroremailmsg, seterroremailmsg] = useState('');
  const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');
  const [namematcherrormsg, setnamematcherrormsg] = useState('');
  const [missmatchpassword, setmissmatchpassword] = useState(null);
  const namematch = /^[a-zA-Z ]{3,30}$/;
  const emailmatch = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordmatch = /^.*(?=.{8,})/;

  const {register} = useContext(AuthContext);

  const submit = () => {
    if (name == '' || email == null || password == null)
      return (
        setnamematcherrormsg('min 3 & no special characters  & number'),
        seterroremailmsg('Enter your valid Email'),
        seterrormatchpassmsg('Password must contain atleat 8 characters')
      );
    else if (!namematch.test(name))
      return setnamematcherrormsg('min 3 & no special characters  & number');
    else if (!emailmatch.test(email))
      return seterroremailmsg('Enter your valid Email');
    else if (!passwordmatch.test(password))
      return seterrormatchpassmsg('Password must contain atleat 8 characters');
    else if (password != confirmpassword)
      return setmissmatchpassword('Password do not match');
    else return register(name, email, password);
  };

  return (
    //     isLoading ?
    //     <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
    //     <Image style={{width:250,height:250}}
    //      source={require('../../assets/loader.gif')} >
    //   </Image>
    //   </View>
    //   :
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={styles.head}>
            <View style={styles.backbutn}>
              <Icon
                name="arrow-back-ios"
                size={28}
                onPress={navigation.goBack}
                style={{left: 30}}
              />
            </View>
            <View style={{flexDirection: 'row', height: 155}}>
              <View style={{width: '50%'}}>
                <Text style={styles.login}>Register</Text>
                <Text style={styles.log}>Register now for free</Text>
              </View>
              <View style={{width: '50%'}}></View>
            </View>
          </View>

          <View style={styles.wrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TextInput
                style={styles.input}
                value={name}
                placeholder="Enter name"
                onChangeText={text => setName(text)}
                maxLength={25}
              />
              <View style={{bottom: 4}}>
                <Text>
                  {!namematch.test(name) ? (
                    <Text style={styles.errormsg}>{namematcherrormsg}</Text>
                  ) : (
                    <Text></Text>
                  )}
                </Text>
              </View>

              <TextInput
                style={styles.input}
                value={email}
                placeholder="Enter email"
                onChangeText={text => setEmail(text)}
                maxLength={50}
              />
              <View style={{bottom: 4}}>
                <Text>
                  {!emailmatch.test(email) ? (
                    <Text style={styles.errormsg}>{erroremailmsg}</Text>
                  ) : (
                    <Text></Text>
                  )}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                maxLength={25}
                secureTextEntry
              />
              <View style={{bottom: 4}}>
                <Text>
                  {passwordmatch.test(password) ? (
                    <Text></Text>
                  ) : (
                    <Text style={[styles.errormsg, {bottom: 10}]}>
                      {errorpassmatchmsg}
                    </Text>
                  )}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={confirmpassword}
                placeholder="Confirm password"
                onChangeText={text => setconfirmpassword(text)}
                maxLength={25}
                secureTextEntry
              />
              <View style={{bottom: 4}}>
                <Text>
                  {password == confirmpassword ? (
                    <Text></Text>
                  ) : (
                    <Text style={[styles.errormsg, {bottom: 10}]}>
                      {missmatchpassword}
                    </Text>
                  )}
                </Text>
              </View>
              <TouchableOpacity onPress={() => submit()}>
                <Text style={styles.button}>Register</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <Text>Already have an accoutn? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.orcontainer}>
                <View style={styles.line}></View>
                <Text style={styles.or}> OR </Text>
                <View style={styles.line}></View>
              </View>
          
                <View style={{top: 30, alignItems: 'center'}}>
                  <TouchableOpacity style={styles.socilabutton}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'FontAwesome5_Solid', top: 2}}>
                        {' '}
                        Login in with Google
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
           
            </KeyboardAvoidingView>
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
    top: 40,
    height: 700,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 6,
    height: 56,
    paddingLeft: 30,
  },
  link: {
    color: 'orange',
  },
  button: {
    backgroundColor: colors.primarycolor,
    height: 44,
    textAlign: 'center',
    color: colors.white,
    borderRadius: 5,
    paddingTop: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
  head: {
    backgroundColor: 'white',
    width: '100%',
    height: 200,
  },
  backbutn: {
    backgroundColor: 'white',
    width: '100%',
    top: 10,
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

  errormsg: {
    color: 'red',
    textAlign: 'center',
    left: 10,
  },
  orcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  line: {
    width: 30,
    top: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  or: {
    textAlign: 'center',
    top: 13,
    fontWeight: '300',
    color: 'grey',
  },
  socilabutton: {
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#57575730',
  },
});

export default RegisterScreen;
