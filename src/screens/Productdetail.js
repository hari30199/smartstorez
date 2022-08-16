import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState,useMemo, useContext,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchsingleproduct,
  getsingleproduct,
  fetchrelatedproduct,
  getrelatedproduct,
  fetchproductvarients,
  getproductvarient
} from '@redux/slice/Productsslice';
import { fetchcartadd,getcartadd } from '@redux/slice/Cartslice';
import {colors,fonts} from '@constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import { AuthContext } from '@Auth';



const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Productdetail({route,props}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mount = useRef(true)
  const id = route.params.id
  const {userInfo} = useContext(AuthContext);
  const product = useSelector(getsingleproduct);
  const relatedproduct = useSelector(getrelatedproduct);
  const provarient = useSelector(getproductvarient);
  const addcart = useSelector(getcartadd);
  const [Loading, setIsLoading] = useState(false);
  const [relatedLoading, setrelatedLoading] = useState(false);
  const [cartLoading, setcartLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [selectvarient, setselectvarient] = useState(''); 
  const [selectcolor, setselectcolor] = useState('');
  const [flag, setflag] = useState(0);

  var varient = ''
  var colors = ''

  const emptystring = ()=>{
    const a = true
    if (a == true) {
      return <Text></Text>;
    } else {
      return <Text>Login</Text>;
    }
   }
      // singleproduct API

      useEffect(() => {
        setIsLoading(true);
        dispatch(fetchsingleproduct(id)).then(() => {
          setIsLoading(false);
        });
      
    }, [dispatch,id]);

      // relatedproductApi

  useEffect(() => {
    setrelatedLoading(true);
    dispatch(fetchrelatedproduct(id)).then(() => {
      setrelatedLoading(false);
    });
  }, [dispatch,id]);
   
 
    // renderitem
   const item = product?.data != undefined || product?.data != null ?  
   (product?.data[0]):(<Text></Text>)
   
   const userid = userInfo?.user?.id


   function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


  var defaultvarient =  item?.choice_options?.length == 0? (<Text></Text>):
  console.log('de',item?.choice_options?.length)

  if(item?.choice_options?.length>0){
   defaultvarient=item?.choice_options[0]?.options[0]
  //  console.log('de',item?.choice_options[0]?.options[0])
   if(flag==0){
    if(varient=='')
   sleep(1000).then(() => {
    setselectvarient(defaultvarient)     
    setflag(1);
  });
}
 

var defaultcolor =  item?.colors.length == 0? (<Text></Text>):
console.log('color',item?.colors?.length)

if(item?.colors?.length>0){
 defaultcolor=item?.colors[0]
 console.log('colorde',item?.colors[0])
 if(flag==0){
  if(colors=='')
 sleep(1000).then(() => {
  setselectcolor(defaultcolor.replace('#',''))     
  setflag(1);
});
}

}
 }

     const addvarient =(value)=>{
      setflag(1);
      varient=value
      setselectvarient(value)    
     }

     const addcolor =(values)=>{
      setflag(1);
      colors=values   
      setselectcolor(values.replace('#',''))  
     }

     useEffect(()=>{
      setIsLoading(true);
        dispatch(fetchproductvarients({id:id,color:selectcolor,varients:selectvarient})).then(()=>
        setIsLoading(false))
     },[id,selectcolor,selectvarient])
      
    console.log('screen',provarient)
   

    const variants= provarient?.variant
    console.log(variants)

     const Addtocart = () =>{
      setcartLoading(true);
      dispatch(fetchcartadd({id:id,variant:variants,user_id:userid,quantity:quantity})).then(()=>
      setcartLoading(false))
     }

     console.log(addcart)

  
   return Loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView style={styles.container}>
      
      {/* {/ header /} */}
     
        <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={()=>navigation.goBack()}>
          <Ionicons name='arrow-back' size={30} color={colors.black}/>
          </TouchableOpacity>
          <View style={styles.rigthbutton}>
            <TouchableOpacity style={styles.share}>
            <Ionicons name='ios-share-social-outline' size={30} color={colors.black}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.share}>
            <Ionicons name='heart-outline' size={30} color={colors.black}/>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* {/ ----image--- /} */}

        <ScrollView style={{zIndex:-2}}
        >
         <View style={styles.imagecontainer}>
          <Image resizeMode='cover' style={styles.banner} source={{uri : item.thumbnail_image}}/>
          </View>  
          <View style={styles.contentcontainer}>

              {/* {/ namecontainer /} */}

            <View style={styles.namecontainer}>
              <Text style={styles.productname}>{item.name}</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Reviews')} style={styles.ratingcontainer}>
                <View style={{flexDirection:'row'}}>
                 {/* {/ <Stars key={Stars} score={input}></Stars> /} */}
                </View>
              <Text>reviews<Ionicons name='arrow-forward' size={12}/></Text>      
             </TouchableOpacity>
            </View>

            {/* {/ soldby /} */}

            <View style={styles.soldbycontainer}>
              <Text style={styles.soldby}>Sold by:</Text>
              <Text style={styles.shopname}>{item.shop_name}</Text>
            </View>
              
              {/* {/ size and color    /} */}


              <View style={[styles.soldbycontainer,{height:100}]}>
                {item?.choice_options?.length == 0? (emptystring()) :(
                  item?.choice_options?.map((choice,index)=>
                    <View key={index} style={{flexDirection:'row'}}>
                    <Text style={styles.soldby}>{choice.title}</Text>
                    { choice.options == null && choice.options == undefined ? 
                    emptystring() :
                      Object.entries(choice?.options).map(([key,value])=> {
                        return (
                          <View>
                              <TouchableOpacity 
                              style={{margin:5}} 
                              onPress={()=>{addvarient(value),setselectvarient(value)}}>
                              <Text style={{color:selectvarient == value ? 'red':'black'}}>{value}</Text>
                              
                            </TouchableOpacity>
                            
                          </View>
                              );
                            })
                    }
                    </View>
                    )
                )}
              
               {item?.colors?.length == 0 ?
                (emptystring()):(
              <View style={{flexDirection:'row'}}>
              <Text>colors</Text>

                <View style={{flexDirection:'row'}}>
               
                  {item.colors == null && item.colors == undefined ? 
                    emptystring():
                   Object.entries(item?.colors).map(([key,value])=> {
                     let color = value
                 return (
                   <View >
                     <TouchableOpacity style={{margin:5,padding:2}}
                      onPress={()=>{addcolor(color.replace("#", "")),setselectcolor(color.replace("#", ""))}}>
                       {/* <Text style={{backgroundColor:value,color:selectcolor === color.replace("#", "") ?'red':'black'}}> {color}</Text> */}
                        <View style={{width:30,height:30,backgroundColor:value,borderWidth:selectcolor === color.replace("#", "") ? 1:0}}></View> 
                     </TouchableOpacity>
                   </View>
                       );
                     })}
                
              
                </View>
              </View>
                )}
               

              
            </View>

            {/* {/ price /} */}
            <View style={styles.pricecontainer}>
              <Text >Discount Price :</Text>
              <View style={styles.prices}>
                <View style={styles.mainpricecontainer}>
                <Text style={styles.mainprice}>{item.main_price}</Text> 
              {/* {/ <Text style={styles.discount}> {discount()} % off</Text>     /} */}
              <Text style={styles.stroked_price}>{item.stroked_price}</Text>
                </View>
              
   
            <View style={styles.cartbuttons}>
            {quantity != 1 ?(
             <TouchableOpacity onPress={()=>setquantity(quantity=>quantity-1)}  style={styles.cartaddplusbutton}>
             <Text style={styles.addplustxt}>-</Text>
           </TouchableOpacity>
            ):(<TouchableOpacity  style={styles.cartaddplusbutton}>
            <Text style={styles.addplustxt}>-</Text>
          </TouchableOpacity>)}
               
              <Text style={styles.quantity}>{quantity}</Text>
              {quantity == item?.current_stock ? (
                <TouchableOpacity  style={styles.cartaddplusbutton}>
                <Text style={styles.addplustxt}>+</Text>
              </TouchableOpacity>
              ):(
                <TouchableOpacity onPress={()=>setquantity(quantity=>quantity+1)} style={styles.cartaddplusbutton}>
                <Text style={styles.addplustxt}>+</Text>
              </TouchableOpacity>
              )}
              
              </View>
            </View>
            <View style={styles.buycontainer}>
            <Text>Avaliable:{item.current_stock}</Text>
            <TouchableOpacity style={styles.cartbutton} onPress={()=>Addtocart()}>
                 <Text style={styles.carttext}>Add to cart</Text>
            </TouchableOpacity>
            </View>
            </View>
            {/* {/ discription /} */}
            <View style={styles.descriptioncontainer}>
             <Text style={styles.headinginfo}>Product Info</Text>
             {item?.description?.length > 120 ? (
        showMore ? (
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <RenderHtml style={[styles.postDescription,{paddingBottom:10}]} source={{html:item.description}} contentWidth={width}/>
            <Text style={styles.seeMore}>Show less</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <RenderHtml contentWidth={width} style={styles.postDescription} source={{html:item.description.slice(0, 120)}}/>
            <Text style={styles.seeMore}>Show more</Text>
          </TouchableOpacity>
        )
      ) : (
        <Text style={styles.postDescription}>{item.description}</Text>
      )}
            </View>


           {/* {/ Related products /} */}
           <View style={styles.rpcontainer}>
            <Text style={styles.headinginfo}>Related products</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {relatedproduct?.data?.map((data, index) => (
          <TouchableOpacity key={index} style={styles.Touchabels} onPress={()=>navigation.navigate('Productdetail',{id:data.id})}>
            {/* {/ <Text style={styles.rpdiscount}>{rpdiscount(data)}%</Text> /} */}
            <Image
              resizeMode="cover"
              style={styles.img}
              key={index}
              source={{uri: data.thumbnail_image}}
            />
            <Text key={id} numberOfLines={2} style={styles.text}>{data.name}</Text>
            <View  style={styles.rppricecontainer}>
            <Text  style={styles.rpmainprice}>{data.main_price}</Text>
            <Text  style={styles.rpstrokedprice}>{data.stroked_price}</Text>
            </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
           </View>
          </View>
          </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white
    },
    header:{
      width:width,
      height:height*0.07,
      flexDirection:'row',
      justifyContent:'space-between',
      position:'absolute'
    },
    backbutton:{
      width:width*0.12,
      height:height*0.07,
      justifyContent:'center',
      alignItems:'center',
    },
    rigthbutton:{
      flexDirection:'row',
      alignSelf:'center'
    },
    share:{
      margin:10
    },
    imagecontainer:{
      width:width,
      height:height*0.4,
      zIndex:-1,
      backgroundColor:colors.white,
      justifyContent:'center',
      alignItems:'center'
    },
    banner:{
      width:width*0.58,height:height*0.35
    },
    contentcontainer:{
      width:width,
      backgroundColor:colors.inactivebutton,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      paddingBottom:30
    },
    namecontainer:{
      width:width,
      flexDirection:'row',
      alignItems:'center'
    },
    productname:{
      width:width*0.7,
      paddingLeft:20,
      fontSize:16,
      fontFamily:fonts.Bold,
      color:colors.black
    },
    ratingcontainer:{
      width:width*0.3,
      height:60,
      justifyContent:'center',
      alignItems:'center'
    },
    soldbycontainer:{
      width:width*0.9,
      alignSelf:'center',
      borderTopWidth:0.3,
      borderBottomWidth:0.3,
      paddingBottom:8,
      paddingTop:8,
      top:15
    },
    soldby:{
      fontSize:12
    },
    shopname:{
      fontSize:16,
      color:colors.primarycolor 
    },
    pricecontainer:{
      width:width*0.9,
      height:height*0.16,
      top:20,
      alignSelf:'center',
      borderBottomWidth:0.3,
      paddingTop:10
    },
    prices:{
      marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'
    },
    mainprice:{
      fontSize:20,fontFamily:fonts.Bold, color:colors.primarycolor
    },
    stroked_price:{
      textDecorationLine:'line-through'
    },
    discount:{
      color:colors.Secondarycolor,fontFamily:fonts.Semibold,bottom:2,fontSize:12,
    },
    mainpricecontainer:{
      flexDirection:'row'
    },
    cartbutton:{
      backgroundColor:colors.primarycolor,color:colors.white,padding:8,bottom:7,borderRadius:5,width:'52%',alignItems:'center'
    },
    carttext:{
      color:colors.white,fontFamily:fonts.Semibold,fontSize:14
    },
    buycontainer:{
      flexDirection:'row',justifyContent:'space-between',marginTop:20
    },
    descriptioncontainer:{
      width:width*0.9,
      alignSelf:'center',
      marginTop:20,
      borderBottomWidth:0.3,
      paddingBottom:5
    },
    headinginfo:{
      color:colors.primarycolor,
      fontFamily:fonts.Bold,
      fontSize:18,
      top:8,
      height:40
    },
    postContentContainer: {
      flexDirection: 'column',
    },  
    postDescription: {
      paddingTop: 13,
      color: colors.black,
      fontFamily: fonts.Medium,
      fontSize:14,
    },
  
    seeMore: {
      fontStyle: 'italic',
      textDecorationLine: 'underline',
    },
    rpcontainer:{
      width:width*0.92,
      alignSelf:'center',
      height:280,
      top:10
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
    rpdiscount:{
      position:'absolute',
      backgroundColor:colors.Secondarycolor,
      padding:2,
      borderTopLeftRadius:10,
      borderBottomRightRadius:10,
      color:colors.white,
      fontSize:12,
      fontFamily:fonts.Medium,
    },
    rppricecontainer:{top:10,width:'100%',alignItems:'center'},
    rpmainprice:{color:colors.primarycolor,fontSize:12,fontFamily:fonts.Semibold},
    rpstrokedprice:{color:colors.inactivetext,fontSize:10,fontFamily:fonts.Light,  textDecorationLine: 'line-through'},
    cartbuttons:{
      flexDirection:'row',
      width:width*0.3,
      height:20,
      right:10,
      justifyContent:'space-between'
    },
   cartaddplusbutton:{
      width:40,
      borderRadius:4,
      height:20,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor:colors.white
    },
    addplustxt:{
      fontSize:16,
      textAlign:'center',
      fontWeight:'bold',
      color:colors.primarycolor
    },
    quantity:{
      fontSize:16,
      fontWeight:'900',
      color:colors.black
    }
  
  })
