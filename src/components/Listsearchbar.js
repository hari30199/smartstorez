import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView,Image, TouchableOpacity} from 'react-native';

const Item = ({name, details,id}) => {
const navigation = useNavigation()
return(
  <TouchableOpacity onPress={()=>navigation.navigate('Productdetail',{id:id})}>
  <View style={styles.item}>
  <Text style={styles.title}>{name}</Text>
  <Text style={styles.details}>{details}</Text>
</View>
</TouchableOpacity>
)
  
} 


const ListSearchbar = ({searchPhrase, setClicked, data}) => {

  const renderItem = ({item}) => {
    if (searchPhrase === '') {
      return <Item name={item.query} details={item.type} id={item.id}></Item>;
    }
    if (
      item.query
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.query} details={item.type} id={item.id}></Item>;
    }
    if (
      item.query
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.query} details={item.type} id={item.id}></Item>;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}>
        {!searchPhrase == '' && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}></FlatList>
        )}
      </View>
      <View style={{flex:1, backgroundColor:'white',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',opacity:0.1}}>
      {/* <Image
                  style={{width:'60%',height:'60%'}}
                  source={require('../img/products.png')}
                  resizeMode="cover"></Image> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: '75%',
    width: '90%',
    bottom:40
  },
  item: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,

  },
});

export default ListSearchbar;
