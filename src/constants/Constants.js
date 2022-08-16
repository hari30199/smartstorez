import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'http://18.140.57.144/api/v2'

// -----Colors----- //

export const colors = {
  primarycolor: '#1c3481',
  Secondarycolor: '#f60003',
  white: '#ffffff',
  black: '#1b1b28',
  inactivetext: '#76767e',
  textbg: '#eef0f2',
  inactivebutton: '#dde1ec',
};

//   -----Fonts------

export const fonts = {
  Bold: 'OpenSans-Bold',
  Extrabold: 'OpenSans-ExtraBold',
  Light: 'OpenSans-Light',
  Medium: 'OpenSans-Medium',
  Regular: 'OpenSans-Regular',
  Semibold: 'OpenSans-SemiBold',
};

  //passing auth header
 
export const _retrieveData = async (user) => {
  try {
     value = await AsyncStorage.getItem('userInfo')
    if(value !== null) {
    }
     return user= value
    
  } catch(e) {
  }
}

 //constant global variable

export class ConstantClass {
  static token = '';
}

// const name = Settings.get("your_id_key_can_get_from_setting_bundle");
// console.log(name);

// Settings.watchKeys('your_id_key', () => {
//   console.log(Settings.get("your_id_key"))
// })

