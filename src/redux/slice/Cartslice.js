import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
 //cartdetails

 var tokenvalue="";

  const _retrieveData = async (user) => {
    try {
       const value = await AsyncStorage.getItem('userInfo')
   tokenvalue=JSON.parse(value);
       tokenvalue=tokenvalue.access_token;
       console.log(tokenvalue)
    } catch(e) {
    }
  }

_retrieveData();

//cart details
   
 export const fetchcartdetails = createAsyncThunk(
  "carts",
  async (id) => {
    const axios1 = axios(tokenvalue);
    const response = await axios1.post(`carts?user_id=${id}`)
    return response.data
    
  }
);
   
  // cart Quantity 
 
  export const fetchcartquantity = createAsyncThunk(
    "carts/process",
    async (data) => {
      const axios1 = axios(tokenvalue);
      const response = await axios1.post(`carts/process?cart_ids=${data.cartid}&cart_quantities=${data.Quantity}` 
      )
      return response.data
      
    }
  );
  
  //Add to cart

export const fetchcartadd = createAsyncThunk(
    "carts/add",
    async (detail) => {
      console.log(detail)
      const axiosi = axios(tokenvalue);
      const response = await axiosi.post(`carts/add?id=${detail.id}&variant=${detail.variant}&user_id=${detail.userid}&quantity=${detail.quantity}`)
      return response.data
      
    }
  );

  //Delete cart 
  

const initialState = {
    Addcart :{},
    CartDetails:{},
    CartQuantity:{}
}

const CartSlice = createSlice ({
    name :'cart',
    initialState ,
    reducers : {},
    extraReducers :{
          [fetchcartadd.pending]: () => {
            console.log("Pending");
          },
          [fetchcartadd.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, addcart: payload };
          },
          [fetchcartdetails.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, cartdetails: payload };
          },
          [fetchcartquantity.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, cartquantity: payload };
          },
          [fetchcartadd.rejected]: () => {
            console.log("Rejected!");
          },
    }
})


export const getcartadd = (state) => state.Addcart.addcart;
export const getcartdetails = (state) => state.Addcart.cartdetails;
export const getcartquantity = (state) => state.Addcart.cartquantity;
export default CartSlice.reducer;