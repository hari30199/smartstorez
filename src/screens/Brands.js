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
  fetchAllbrands,
  getallbrands,
} from '@redux/slice/Brandsslice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '@constants/Constants';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Categories() {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const brands = useSelector(getallbrands);
  const navigation = useNavigation();
  const [pagelink,setpagelink] =useState('')

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllbrands(pagelink)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch,pagelink]);

  return Loading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      {/* header   */}
      <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={()=>navigation.goBack(null)}>
          <Ionicons name='arrow-back' size={30} color={colors.black}/>
          </TouchableOpacity>
          <Text style={styles.headertext}>All Brands</Text>
        </View>

        {/* container */}

      <FlatList
        data={brands?.data}
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
        numColumns={2}
        keyExtractor={(item, index) => index}
      />

          {brands?.meta?.total <= 10 ? (
            <Text></Text>
          )
          :(
            <View style={styles.paginationcontainer}>
            { brands?.meta?.links?.map((data,index)=>(
                <TouchableOpacity key={index} onPress={()=>{setpagelink(data.url.slice(-1))}}>
                  {data.url == null ? (
                   <Text></Text>
                  ):(
                    <Text style={[styles.pagenum,{fontWeight:data.active == true ? '800':'100', color:data.active == true ? colors.primarycolor:colors.black,}]}>{data.label}</Text>
  
                  )}
               </TouchableOpacity>
            ))}
         </View>
          )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header:{
    width:width,
    height:height*0.07,
    flexDirection:'row',
    alignItems:'center'
  },
  backbutton:{
    width:width*0.12,
    height:height*0.07,
    justifyContent:'center',
    alignItems:'center',
  },
  headertext: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: colors.primarycolor,
    left:10
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
 
  paginationcontainer:{
    width:width*0.94,
    height:height*0.05,
    alignSelf:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
  },
  pagenum:{
    padding:6,
    borderRadius:5,
    fontFamily:fonts.Medium
  }
});
