import { StyleSheet, Text, View,SafeAreaView,Image,Dimensions,ScrollView,TouchableOpacity } from 'react-native'
import React,{useContext,useState,useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors ,fonts } from '@constants/Constants'
import { AuthContext } from '@Auth';
import {getcartdetails,fetchcartdetails,fetchcartquantity,getcartquantity } from '@redux/slice/Cartslice';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

const Cart = () => {
  const [Loading, setIsLoading] = useState(false);
  const [cartLoading, setcartIsLoading] = useState(false);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const cartdetails = useSelector(getcartdetails);
  const cartquantity = useSelector(getcartquantity)
  const {userInfo} = useContext(AuthContext);
  const [cartquantities,setcartquantities] = useState(1)

  const userid = userInfo?.user?.id
  var quantitys = ''

  useEffect(()=>{
    setIsLoading(true);
    dispatch(fetchcartdetails(userid)).then(() => {
      setIsLoading(false);
    });
  },[])

  const cartprocess = useCallback((id,quantity,action)=>{
    console.log(id,action,quantity)
    quantitys = quantity
    console.log(quantitys)
    if(action != 'add')
    quantitys = quantitys - 1
    else
    quantitys = quantitys + 1

    setcartIsLoading(true);
    dispatch(fetchcartquantity({cartid:id,Quantity:quantitys})).then(() => {
      setIsLoading(false);dispatch(fetchcartdetails(userid))
    })
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={()=>navigation.goBack()}>
          <Ionicons name='arrow-back' size={30} color={colors.black}/>
          </TouchableOpacity>
          <Text style={styles.cartheading}>Shopping Cart</Text>
        </View>
        {Loading ? <Text>Loading...</Text>:
        
     <ScrollView showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom:20}}>
     {cartdetails?.map((data, index) => (
      <View key={index}>
        <Text style={styles.sellertext}>Sold by : {data.name}</Text>
        {data.cart_items.map((item, index) => (
      <View key={index} style={styles.card}>
          <Image
              resizeMode="cover"
              style={styles.img}
              key={index}
              source={{uri: item.product_thumbnail_image}}
            />
            <View style={styles.productcontent}>
            <Text numberOfLines={1} style={styles.text}>{item.product_name}</Text>
            <Text  style={styles.avaliabletext}>In stock : {item.upper_limit}</Text>
            </View>
            <View style={styles.cartfunction}>
              <Text>{item.currency_symbol} {item.price}</Text>
         
                    <View style={styles.cartbuttons} >
                    <TouchableOpacity 
                    style={styles.cartaddplusbutton}
                    onPress={()=>cartprocess(item.id,item.quantity,'sub')}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity style={styles.cartaddplusbutton}
                  onPress={()=>cartprocess(item.id,item.quantity,'add')}>
                    <Text>+</Text>
                  </TouchableOpacity>
               
             
              </View>
              <TouchableOpacity style={styles.removebutton}>
                <Text style={styles.removetext}>Remove</Text>
              </TouchableOpacity>
              </View>
      </View>
        ))}
      </View>
        
        
        ))}
       
     </ScrollView>
}
     <View style={styles.bottomview}>
      <Text>total:</Text>
      <TouchableOpacity style={styles.pocbutton}>
        <Text style={styles.poctext}>Proceed to Checkout </Text>
        <MaterialIcons name='payments' color={colors.white} size={16}/>
      </TouchableOpacity>
     </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  header:{
    width:width,
    height:height*0.16,
    backgroundColor:colors.textbg
  },
  backbutton:{
    width:width*0.12,
    height:height*0.07,
    justifyContent:'center',
    alignItems:'center',
  },
  cartheading:{
    textAlign:"center",
    fontSize:22,
    fontFamily:fonts.Medium,
    fontWeight:'600',
    color:colors.black,
  },
  card:{
    width:width*0.92,
    height:height*0.16,
    backgroundColor:colors.white,
    marginTop:10,
    alignSelf:'center',
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:'row',
    alignItems:'center'
  },
  img: {
    width: width * 0.20,
    height: height * 0.1,
    left:10
  },
  productcontent:{
    width:width*0.46,
    height:height*0.12,
    paddingLeft:16
  },
  text: {
    width: width * 0.40,
    textAlign: 'center',
    fontFamily:fonts.Semibold,
    color:colors.black,
    fontSize:16,
  },
  sellertext:{
    width: width * 0.92,
    fontFamily:fonts.Semibold,
    color:colors.black,
    fontSize:16,
    alignSelf:'center',
    top:6
  },
  cartfunction:{
    width:width*0.24,
    height:height*0.12,
    alignItems:'center',
  },

  cartbuttons:{
    flexDirection:'row',
    width:width*0.2,
    justifyContent:'space-around',
    top:10
  },
  removebutton:{
    backgroundColor:colors.Secondarycolor,
    top:22,
    borderRadius:5,
    left:4,
    width:78,
    height:30,
    alignItems:'center',
    justifyContent:'center'
  },
  removetext:{
    color:colors.white,
    fontFamily:fonts.Medium
  },
  avaliabletext:{
    fontFamily:fonts.Medium,
    top:8
  },
  cartaddplusbutton:{
    borderWidth:0.3,
    width:20,
    borderRadius:10,
    height:20,
    alignItems:'center'
  },

  bottomview:{
    width:width*0.94,
    height:46, 
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:4,
    borderTopWidth:1
  },
  pocbutton:{
    backgroundColor:colors.primarycolor,
    height:40,
    width:'60%',
    borderRadius:5,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  poctext:{
    color:colors.white,
    fontFamily:fonts.Semibold,
    fontSize:16,
    left:8
  }
})
export default Cart