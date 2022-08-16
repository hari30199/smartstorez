import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, SafeAreaView,Dimensions, ActivityIndicator,TouchableOpacity} from 'react-native';
import ListSearchbar from '@components/Listsearchbar';
import SearchBar from '@components/Searchbar';
import {
  fetchsearchproducts,
  getsearchsuggestion,
} from '@redux/slice/Productsslice';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors,fonts} from '@constants/Constants'
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

const HomeSearch = () => {
  const [Loading, setIsLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const searchData = useSelector(getsearchsuggestion);
  const navigation = useNavigation()

  
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchsearchproducts(searchPhrase)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch,searchPhrase]);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked &&
      <View style={styles.header}>
      <TouchableOpacity style={styles.backbutton} onPress={()=>navigation.goBack()}>
      <Ionicons name='arrow-back' size={30} color={colors.black}/>
      </TouchableOpacity>
            </View>  
     
      }
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}></SearchBar>

      {!searchData ? (
        <ActivityIndicator size="small" color="#00ff00"></ActivityIndicator>
      ) : (
        searchData.length == 0 ? <Text style={{flex:1,alignSelf:'center'}}>No Products Found</Text>:
        <ListSearchbar
          searchPhrase={searchPhrase}
          data={searchData}
          setClicked={setClicked}></ListSearchbar>
         
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
   flex:1,
   backgroundColor:colors.white
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily:fonts.Semibold
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
});

export default HomeSearch;
