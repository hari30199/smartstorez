import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState,useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
    fetchsubcategories,
    getsubcategories,
} from '@redux/slice/Categoriesslice';
import {
    fetchproductcategory,
    getcategoryproduct,
} from '@redux/slice/Productsslice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors,fonts} from '@constants/Constants';
import Dropdown from '@components/Dropdown';


const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Productsscreen({route}) {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const subcat = useSelector(getsubcategories);
  const catpro = useSelector(getcategoryproduct);
  const [input,setInput] = useState('');
  const [pagelink,setpagelink] = useState("Next");
  const [selected, setSelected] = useState(undefined);
  const navigation = useNavigation();
  const id = route.params.id


  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchsubcategories(id)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    
    dispatch(fetchproductcategory({id:id,page:pagelink})).then(() => {
      setIsLoading(false);
    });
  }, [dispatch,pagelink,id]);


  const discount = (data)=>{
    const price1 = data.main_price
    const price2 = data.stroked_price
    const noSpecialCharacters = price1.replace(/[^a-zA-Z0-9 ]/g,'').slice(2) 
    const noSpecialCharacter = price2.replace(/[^a-zA-Z0-9 ]/g,'').slice(2) 
    const price3 = Math.round((noSpecialCharacters/noSpecialCharacter)*100)
    return price3
  }

  useEffect(()=>{
    const count = catpro?.data?.rating_count;
    setInput(count);
  },[]);

  function Stars({score}){
    const stars = useMemo(()=>{
        const stars =[];
    
        for(let i=1; i<=5;i++)
        {
            stars.push(i<=Math.round(score) ? <Ionicons name='star' size={15} ></Ionicons> : <Ionicons name='star-outline' size={15} ></Ionicons>);
        }
        return stars;
    },[score]);
    return stars.map((el) => <Text>{el}</Text>)
    }

    const data = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
      { label: 'Five', value: '5' },
    ];


  return Loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView style={styles.container}>
        <ScrollView stickyHeaderIndices={subcat?.data?.length == 0?[1]:[2]}>
            {/* header */}
           
             <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={()=>navigation.goBack()}>
          <Ionicons name='arrow-back' size={30} color={colors.black}/>
          </TouchableOpacity>
        </View>   
            
        
                   {/* subcategories */}

    {subcat?.data?.length == 0?(<Text></Text>):(
        <View>
    
      <Text style={styles.heading}>Sub Categories</Text>
      <ScrollView horizontal={true} style={{height:170,paddingRight:15}} showsHorizontalScrollIndicator={false}>
        {subcat?.data?.map((data, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Productsscreen',{id:data.id})} key={index} style={styles.Touchabels}>
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
      )} 


      {/* stickyHeaderIndices */}


      <View>
      <Text style={styles.heading}>Products</Text>
      <View style={{width:width,height:height*0.1,flexDirection:'row'}}>
      {/* {!!selected && (
        <Text>
          Selected: label = {selected.label} and value = {selected.value}
        </Text>
      )} */}
      
      <Dropdown label="Select Item" data={data} onSelect={setSelected} />
      </View>
     
        </View>

        {/* Products */}


        {catpro?.data?.map((data, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Productdetail',{id : data.id})} key={index} style={styles.productTouchabels}>
            <View>
            <ImageBackground
              resizeMode="cover"
              style={styles.proimg}
              key={index}
              source={{uri: data.thumbnail_image}}
            >
              <Text style={styles.discount}>{discount(data)}%</Text>
            </ImageBackground>
            </View>
           
            <View style={{paddingLeft:10}}>
            <Text numberOfLines={2}  style={styles.protext}>{data.name}</Text>
            <View>
            <Text style={styles.proprice}>{data.main_price}</Text>
            <Text style={styles.prostrikerdprice}>{data.stroked_price}</Text>
            <View style={{flexDirection:'row'}}>
            <Stars  key={Stars} score={input}></Stars>
            </View>
            </View>
            </View>
          </TouchableOpacity>
        ))}
         

         {/* paginationcontainer */}

         
        {catpro?.meta?.total <= 10 ? (
          <Text></Text>
        )
        :(
          <View style={styles.paginationcontainer}>
          { catpro?.meta?.links?.map((data,index)=>(
              <TouchableOpacity onPress={()=>{setpagelink(data.url.slice(-1))}}>
                {data.url == null ? (
                 <Text></Text>
                ):(
                  <Text style={[styles.pagenum,{fontWeight:data.active == true ? '800':'100', color:data.active == true ? colors.primarycolor:colors.black}]}>{data.label}</Text>

                )}
             </TouchableOpacity>
          ))}
       </View>
        )}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:colors.white
  },
  header:{
    width:width,
    height:height*0.07,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  backbutton:{
    width:width*0.12,
    height:height*0.07,
    justifyContent:'center',
    alignItems:'center',
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
    height: 130,
    marginTop:10
  },
  text: {
    width: width * 0.24,
    textAlign: 'center',
    fontFamily:fonts.Bold,
    color:colors.black,
    fontSize:12
  },
  img: {
    width: width * 0.18,
    height: height * 0.1,
  },
  heading:{
    fontFamily:fonts.Bold,
    fontSize:18,
    left:10,
    color:colors.primarycolor,
    backgroundColor:colors.white
  },
  productTouchabels:{
    width:width*0.94,
    height:150,
    backgroundColor:colors.white,
    marginTop:10,
    alignSelf:'center',
    borderRadius:5,
    flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems:'center'
  },
  proimg: {
    width: width * 0.3,
    height: height * 0.16,
    alignSelf:'center'
  },
  discount:{
    position:'absolute',
    backgroundColor:colors.Secondarycolor,
    padding:2,
    borderBottomRightRadius:10,
    color:colors.white,
    fontSize:12,
    fontFamily:fonts.Medium,
    borderTopRightRadius:10
  },
  protext:{
    width:width*0.55,
    fontFamily:fonts.Semibold,
    color:colors.inactivetext,
    fontSize:17,
    fontWeight:'500',
    paddingTop:5
  },
  proprice:{
    fontFamily:fonts.Medium,
    fontWeight:'700',
    fontSize:16,
    color:colors.primarycolor,
    paddingTop:5
  },
  prostrikerdprice:{
    color:colors.inactivetext,fontSize:12,fontFamily:fonts.Light,  textDecorationLine: 'line-through',
    // top:16
  },
  paginationcontainer:{
    width:width*0.94,
    height:height*0.1,
    alignSelf:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center'
  },
  pagenum:{
    backgroundColor:colors.inactivebutton,
    padding:6,
    borderRadius:5,
    fontFamily:fonts.Medium
  }
});
