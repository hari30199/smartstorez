import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';

 
  var tokenvalue="";

  const _retrieveData = async (user) => {
    try {
       const value = await AsyncStorage.getItem('userInfo')

   tokenvalue=JSON.parse(value);
   
       tokenvalue=tokenvalue.access_token;
      //  console.log('slider',tokenvalue)

    
      
    } catch(e) {
    }
  }

_retrieveData();

 //get homeslider

export const fetchhomeslider = createAsyncThunk(
    "sliders",
    async () => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`sliders`)
      return response.data
      
    }
  );


  //home banner
  export const fetchhomebanner = createAsyncThunk(
    "banners",
    async () => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.get(`banners`)
      return response.data
      
    }
  );
 
  
const initialState = {
    homeslider :{},
    homebanner:{},
}

const homesliderSlice = createSlice ({
    name :'sliders',
    initialState ,
    reducers : {},
    extraReducers :{
          [fetchhomeslider.pending]: () => {
            // console.log("Pending");
          },
          [fetchhomeslider.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, sliders: payload };
          },
          [fetchhomebanner.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, banners: payload };
          },
          [fetchhomeslider.rejected]: () => {
            console.log("Rejected!");
          },
    }
})


export const gethomesliders = (state) => state.homeslider.sliders;
export const gethomebanners = (state) => state.homeslider.banners;
export default homesliderSlice.reducer;