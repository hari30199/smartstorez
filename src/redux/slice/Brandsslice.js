import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../Api'
import AsyncStorage from "@react-native-async-storage/async-storage";


var tokenvalue = '';

const _retrieveData = async user => {
  try {
    const value = await AsyncStorage.getItem('userInfo');

    tokenvalue = JSON.parse(value);

    tokenvalue = tokenvalue.access_token;
    // console.log('brand',tokenvalue);
  } catch (e) {}
};

_retrieveData()
  //get allbrands
 

export const fetchAllbrands = createAsyncThunk(
    "brands",
    async (pagelink) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`brands?page=${pagelink}`)
      return response.data
      
    }
  );

 
  
const initialState = {
    Allbrands :{},
}

const BrandsSlice = createSlice ({
    name :'brands',
    initialState ,
    reducers : {},
    extraReducers :{
          [fetchAllbrands.pending]: () => {
            // console.log("Pending");
          },
          [fetchAllbrands.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, brands: payload };
          },
          [fetchAllbrands.rejected]: () => {
            console.log("Rejected!");
          },
    }
})


export const getallbrands = (state) => state.Allbrands.brands;
export default BrandsSlice.reducer;