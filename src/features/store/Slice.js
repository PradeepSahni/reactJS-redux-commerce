import {createSlice } from '@reduxjs/toolkit';
import img1 from  '../../assets/img1.jpg' 
import img2 from  '../../assets/img2.jpg' 
import img3 from  '../../assets/img3.jpg'

const initialState = {
  products : [
      {
        id: 1,
        name: "DOUBLERUN 9031",
        description: "This is the first product",
        price: 10.99,
        image: img1,
        category: "Category 1",
        sizes: ["S", "M", "L"],
        colors: ["Black", "White", "Grey"]
      },
      {
        id: 2,
        name: "DOUBLERUN 9032",
        description: "This is the second product",
        price: 15.99,
        image: img2,
        category: "Category 2",
        sizes: ["S", "M", "L"],
        colors: ["Black", "White", "Grey"]
      },
      {
          id: 3,
          name: "DOUBLERUN 9033",
          description: "This is the third product",
          price: 15.99,
          image: img3,
          category: "Category 2",
          sizes: ["S", "M", "L"],
          colors: ["Black", "White", "Grey"]
      }
  ],
  carts: [] ,
  checkout: {}
};

export const Slice = createSlice({
  name: 'myStore',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCartItem: (state, action) => {
      state.carts.push(action.payload)
    },
    removeCartItem: (state, action) => {
      let cartID = action.payload; 
      let row = Object.values(
        state.carts
      ).filter(
        (option) => option.id != cartID
      )
      state.carts = row 
    },
    updateCartItemQTY: (state, action) => {
      let request = action.payload;
      state.carts.map((row,index)=>{
          if(row.id == request.id){
            state.carts[index].quantity = request.value
          }
      })
    },
    checkoutShopping: (state, action) => {
      state.checkout = action.payload
    },
    emptyCart : (state,action)=>{
      state.carts = [];
    }
  }
});

export const { addCartItem,removeCartItem,updateCartItemQTY,checkoutShopping,emptyCart } = Slice.actions;

export const selectStore = (state) => state.myStore;


export default Slice.reducer;
