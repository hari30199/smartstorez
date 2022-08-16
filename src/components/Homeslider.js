import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { fetchhomeslider, gethomesliders} from '@redux/slice/Sliderslice';
import {colors} from '@constants/Constants';


const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Homeslider() {
  const navigation = useNavigation();
  const scrollref = React.createRef();
  const dispatch = useDispatch();
  const sliders = useSelector(gethomesliders);
  const [active, setactive] = useState(0);
  const [prev, setprev] = useState(0);
  const [Loading,setIsLoading] = useState(false)


useEffect(() => {
  setIsLoading(true);
  dispatch(fetchhomeslider())
  .then(() => {
      setIsLoading(false);
  });
}, [dispatch,fetchhomeslider])


const change = ({nativeEvent}) => {
  const slide = Math.ceil(
    nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
  );
  if (slide !== active) {
    return setactive(slide);
  }
};

// useEffect(()=>{
//    setInterval(()=>{
//     // setprev({active : prev.active+1}),
//     //  scrollref.current.scrollTo({
//     //     animated:true,
//     //     Y:0,
//     //     X:width * active
//     //   })
//     const prev =()=>{ }
//    },4000)
// },[])

  return (
    Loading ? <Text>Loading</Text>:
   <View>   
   
    <ScrollView
    // ref={scrollref}
    horizontal={true}
    pagingEnabled={true}
    showsHorizontalScrollIndicator={false}
    // onScroll={change}
    onMomentumScrollEnd={change}
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {sliders?.data.map((data, index) => (
      <View key={index} style={styles.item}>
          <Image style={{width: width, height: height*0.17}} key={index} source={{uri:data.photo}} />
      </View>
    ))}
  </ScrollView>
  <View style={styles.pagination}>
    {sliders?.data.map((i, k) => (
      <View
        key={k}
        style={[
          styles.paginationDot,
          {
            backgroundColor:
              k == active ? colors.primarycolor : colors.inactivebutton,
          },
        ]}>
        </View>
    ))}
  </View>
  </View>
      
  );
}

const styles = StyleSheet.create({
  item: {
    width: width,
    height:height*0.17,
  },
  pagination: {
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent:'center',
    top:10
  },
  paginationDot: {
    width: '5%',
    height: 6,
    margin: 3,
    borderRadius: 20,
  },
});
