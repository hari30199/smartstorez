import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';

var tokenvalue="";

const _retrieveData = async () => {
  try {
     const value = await AsyncStorage.getItem('userInfo')
     tokenvalue=JSON.parse(value);
     tokenvalue=tokenvalue.access_token;
  } catch(e) {
  }
}

_retrieveData();

  //get bestseller product

export const fetchbestseller = createAsyncThunk(
    "products/best-seller",
    async () => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`products/best-seller`)
      return response.data;
    }
  );

  // getsingleproduct

  export const fetchsingleproduct = createAsyncThunk(
    "products",
    async (id) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`products/${id}`)
      return response.data;
    }
  );

  // get related products

  export const fetchrelatedproduct = createAsyncThunk(
    "products/related",
    async (id) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`products/related/${id}`)
      return response.data;
    }
  );

  // get productcategories

  export const fetchproductcategory = createAsyncThunk(
    "products/category",
    async (temp) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`products/category/${temp.id}?page=${temp.page}`)
      return response.data;
    }
  );
   
  //  search products

  export const fetchsearchproducts = createAsyncThunk(
    "pget-search-suggestions",
    async (searchPhrase) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`get-search-suggestions?query_key=${searchPhrase}&type=product`)
      return response.data;
    }
  );

  // products varients
   
  export const fetchproductvarients = createAsyncThunk(
    "products/variant/price",
    async (choices) => {
      console.log(choices)
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`products/variant/price?id=${choices.id}&color=${choices.color}&variants=${choices.varients}`)
      return response.data
    }
  );



const initialState = {
    bestselling :{},
    singleproduct:{},
    relatedproduct:{},
    productcategory:{},
    searchproducts:{},
    Productvarients:{}
}

const products = createSlice ({
    name :'categories',
    initialState,
    reducers:{},
    extraReducers :{
          [fetchbestseller.pending]: () => {
          },
          [fetchbestseller.fulfilled]: (state, { payload }) => {
            return { ...state, featuredcategories: payload };
          },
          [fetchsingleproduct.fulfilled]: (state, { payload }) => {
            return { ...state, singleproduct: payload };
          },
          [fetchrelatedproduct.fulfilled]: (state, { payload }) => {
            return { ...state, relatedproduct: payload };
          },
          [fetchproductcategory.fulfilled]: (state, { payload }) => {
            return { ...state, productcategory: payload };
          },
          [fetchsearchproducts.fulfilled]: (state, { payload }) => {
            return { ...state, searchproducts: payload };
          },
          [fetchproductvarients.fulfilled]: (state, { payload }) => {
            return { ...state, productvarients: payload };
          },
          [fetchbestseller.rejected]: () => {
            console.log("Rejected!");
          },
    }
})

export const getbestsellingproducts = (state) => state.bestselling.featuredcategories;
export const getsingleproduct = (state) => state.bestselling.singleproduct;
export const getrelatedproduct = (state) => state.bestselling.relatedproduct;
export const getcategoryproduct = (state) => state.bestselling.productcategory;
export const getsearchsuggestion = (state) => state.bestselling.searchproducts;
export const getproductvarient = (state) => state.bestselling.productvarients;

export default products.reducer;