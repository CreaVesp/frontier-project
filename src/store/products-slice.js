import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {
    replaceProducts(state, action) {
      state.products = action.payload.products;
    },
    addProducts(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        product => product.id === newProduct.id
      );
      if (!existingProduct) {
        state.products.push({
          id: newProduct.id,
          name: newProduct.name,
          availableToClients: newProduct.availableToClients,
        });
      } else {
        state.products.push({
          id: `c${Math.round(Math.random() * 100)}`,
          name: newProduct.name,
          availableToClients: newProduct.availableToClients,
        });
      }
    },
    removeProduct(state, action) {
      const removableProduct = action.payload;
      state.products.filter(product => product.id !== removableProduct.id);
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;
