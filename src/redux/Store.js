import { configureStore } from "@reduxjs/toolkit";
import homeslider from '@redux/slice/Sliderslice';
import  featuredcategories from '@redux/slice/Categoriesslice';
import bestselling from '@redux/slice/Productsslice';
import Allbrands from '@redux/slice/Brandsslice';
import Addcart from '@redux/slice/Cartslice';

export const store = configureStore({
    reducer:{
        homeslider : homeslider,
        featured : featuredcategories,
        bestselling : bestselling,
        Allbrands :Allbrands,
        Addcart : Addcart
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})