import { configureStore } from '@reduxjs/toolkit';
import clientsSlice from './clients-slice';
import usersSlice from './users-slice';
import productsSlice from './products-slice';

const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    users: usersSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
