import React,{useState,useEffect,useCallback,useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '@constants/Constants';
import Homeslider from '@components/Homeslider';
import Featuredcategoreis from '@components/Featuredcategoreis';
import Productsbestselling from '@components/Productsbestselling';
import Newproducts from '@components/Newproducts';
import Homebanner from '@components/Homebanner';
import { ScrollView } from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.headertouchables}>
          <MaterialIcons name="read-more" size={34} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.headercenter}>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('Search')}>
            <EvilIcons name="search" color={colors.black} size={20} />
            <Text style={styles.searchtext}>Find your products...</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Alert')}
          style={styles.headertouchables}>
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={26}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:80}}>
      <Homeslider/>
      <Featuredcategoreis/>
     <Homebanner/>
      <Newproducts/>
      <Productsbestselling/>
      </ScrollView>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  header: {
    width: width,
    height: height * 0.08,
    flexDirection: 'row',
  },
  headertouchables: {
    width: width * 0.16,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headercenter: {
    width: width * 0.68,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: '92%',
    backgroundColor: colors.inactivebutton,
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: colors.inactivetext,
  },
  searchtext: {
    fontSize: 12,
    color: 'grey',
  },
});
