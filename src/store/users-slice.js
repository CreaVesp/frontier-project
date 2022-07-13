import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload.users;
    },
    addUser(state, action) {
      const newUser = action.payload;
      const existingUser = state.users.find(user => user.id === newUser.id);
      if (!existingUser) {
        state.users.push({
          id: newUser.id,
          name: newUser.name,
          linkedClients: newUser.linkedClients,
          availableProducts: newUser.availableProducts,
        });
      } else {
        state.users.push({
          id: `c${Math.round(Math.random() * 100)}`,
          name: newUser.name,
          linkedClients: newUser.linkedClients,
          availableProducts: newUser.availableProducts,
        });
      }
    },
    removeUser(state, action) {
      const removableUser = action.payload;
      state.users.filter(user => user.id !== removableUser.id);
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
