import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

var tokenvalue="";

  const _retrieveData = async (user) => {
    try {
       const value = await AsyncStorage.getItem('userInfo')

   tokenvalue=JSON.parse(value);
   
       tokenvalue=tokenvalue.access_token;
      //  console.log('category',tokenvalue)

    
      
    } catch(e) {
    }
  }

_retrieveData();

// get All categories

export const fetchallcategories = createAsyncThunk('categories', async () => {
  const axios1 = axios(tokenvalue);
  const response = await axios1.get(`categories`);
  return response.data;
});

//get featured categories

export const fetchfeaturedcategories = createAsyncThunk(
  'categories/featured',
  async () => {
    const axios1 = axios(tokenvalue);
    const response = await axios1.get(`categories/featured`);
    return response.data;
  },
);

// get sub-categories

export const fetchsubcategories = createAsyncThunk(
  'sub-categories',
  async id => {
    const axios1 = axios(tokenvalue);
    const response = await axios1.get(`/sub-categories/${id}`);
    return response.data;
  },
);

const initialState = {
  featured: {},
  allcategories: {},
  subcategories: {},
};

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchfeaturedcategories.pending]: () => {},
    [fetchfeaturedcategories.fulfilled]: (state, {payload}) => {
      return {...state, featuredcategories: payload};
    },
    [fetchallcategories.fulfilled]: (state, {payload}) => {
      return {...state, allcategories: payload};
    },
    [fetchsubcategories.fulfilled]: (state, {payload}) => {
      return {...state, subcategories: payload};
    },
    [fetchfeaturedcategories.rejected]: () => {},
  },
});

export const getAllcategories = state => state.featured.allcategories;
export const getfeaturedcategories = state => state.featured.featuredcategories;
export const getsubcategories = state => state.featured.subcategories;
export default categories.reducer;
