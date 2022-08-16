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
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchallcategories,
  getAllcategories,
} from '@redux/slice/Categoriesslice';
import Feather from 'react-native-vector-icons/Feather';
import {colors, fonts} from '@constants/Constants';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Categories() {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const featuredcat = useSelector(getAllcategories);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchallcategories()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return Loading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      {/* header   */}
      <View style={styles.header}>
        <Text style={styles.headertext}>All categories</Text>
      </View>
      <FlatList
        data={featuredcat?.data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Productsscreen',{id:item.id})} style={styles.Touchabels}>
            
            <Image
              resizeMode="cover"
              style={styles.img}
              source={{uri: item.banner}}
            />
          <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>

        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    width: width,
    height: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: colors.primarycolor,
  },
  Touchabels: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 10,
    width: width * 0.45,
    alignItems:'center',
    justifyContent:'center',
    margin:10,
    padding:10,
    height:150
  },
  text: {
    fontFamily: fonts.Semibold,
    color: colors.black,
    fontSize: 14,
    top:10
  },
  img: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
  },
  textcontainer: {
    width: width * 0.51,
    justifyContent: 'center',
  },
  iconcontainer: {
    width: width * 0.142,
    height: 68,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    width: '70%',
    height: 36,
    backgroundColor: colors.inactivebutton,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
