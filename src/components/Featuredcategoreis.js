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
  fetchfeaturedcategories,
  getfeaturedcategories,
} from '@redux/slice/Categoriesslice';
import {colors,fonts} from '@constants/Constants';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function featuredcategories() {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const featuredcat = useSelector(getfeaturedcategories);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchfeaturedcategories()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return Loading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Categories</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {featuredcat?.data.map((data, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Productsscreen',{
            id:data.id
          })} key={index} style={styles.Touchabels}>
            <Image
              resizeMode="cover"
              style={styles.img}
              key={index}
              source={{uri: data.banner}}
            />
            <Text style={styles.text}>{data.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30, height: 200
  },
  Touchabels: {
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 100,
    marginTop:10
  },
  text: {
    width: width * 0.24,
    textAlign: 'center',
    fontFamily:fonts.Medium,
    color:colors.black,
    fontSize:8,
    fontWeight:'700',
    top:3
  },
  img: {
    width: width * 0.15,
    height: height * 0.08,
  },
  heading:{
    fontFamily:fonts.Bold,
    fontSize:18,
    left:10,
    color:colors.primarycolor
  }
});
