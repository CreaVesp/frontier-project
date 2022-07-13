import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { clients: [] },
  reducers: {
    replaceClients(state, action) {
      state.clients = action.payload.clients;
    },
    addClient(state, action) {
      const newClient = action.payload;
      const existingClient = state.clients.find(
        client => client.id === newClient.id
      );
      if (!existingClient) {
        state.clients.push({
          id: newClient.id,
          name: newClient.name,
          linkedUsers: newClient.linkedUsers,
          availableProducts: newClient.availableProducts,
        });
      } else {
        state.clients.push({
          id: `c${Math.round(Math.random() * 100)}`,
          name: newClient.name,
          linkedUsers: newClient.linkedUsers,
          availableProducts: newClient.availableProducts,
        });
      }
    },
    removeClient(state, action) {
      const removableClient = action.payload;
      state.clients.filter(client => client.id !== removableClient.id);
    },
  },
});

export const clientsActions = clientsSlice.actions;
export default clientsSlice;
