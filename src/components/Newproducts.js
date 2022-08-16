import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchbestseller,
  getbestsellingproducts,
} from '@redux/slice/Productsslice';
import {colors,fonts} from '@constants/Constants';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Newproducts() {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const featuredcat = useSelector(getbestsellingproducts);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchbestseller()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);


  const discount = (data)=>{
    const price1 = data.main_price
    const price2 = data.stroked_price
    const noSpecialCharacters = price1.replace(/[^a-zA-Z0-9 ]/g,'').slice(2) 
    const noSpecialCharacter = price2.replace(/[^a-zA-Z0-9 ]/g,'').slice(2) 
    const price3 = Math.round((noSpecialCharacters/noSpecialCharacter)*100)
    return price3
  }
  
 

  return Loading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.heading}>New Products</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {featuredcat?.data.map((data, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Productdetail',{id : data.id})} key={index} style={styles.Touchabels}>
            <Text style={styles.discount}>{discount(data)}%</Text>
            <Image
              resizeMode="cover"
              style={styles.img}
              key={index}
              source={{uri: data.thumbnail_image}}
            />
            <Text numberOfLines={2} style={styles.text}>{data.name}</Text>
            <View style={{top:10,width:'100%',alignItems:'center'}}>
            <Text style={{color:colors.primarycolor,fontSize:12,fontFamily:fonts.Semibold}}>{data.main_price}</Text>
            <Text style={{color:colors.inactivetext,fontSize:10,fontFamily:fonts.Light,  textDecorationLine: 'line-through',}}>{data.stroked_price}</Text>
            </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30, height: 265
  },
  Touchabels: {
    backgroundColor: colors.white,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 190,
    marginTop:15
  },
  text: {
    width: width * 0.30,
    textAlign: 'center',
    fontFamily:fonts.Semibold,
    color:colors.black,
    fontSize:14,
    top:6,
  
    
  },
  img: {
    width: width * 0.18,
    height: height * 0.1,
    alignSelf:'center',
    
  },
  heading:{
    fontFamily:fonts.Bold,
    fontSize:18,
    left:10,
    color:colors.primarycolor
  },
  discount:{
    position:'absolute',
    backgroundColor:colors.Secondarycolor,
    padding:2,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
    color:colors.white,
    fontSize:12,
    fontFamily:fonts.Medium,
  }
});
