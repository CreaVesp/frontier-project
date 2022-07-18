import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'commonState',
  initialState: { clients: [], users: [], products: [] },
  reducers: {
    replaceAll(state, action) {
      state.clients = action.payload.clients;
      state.users = action.payload.users;
      state.products = action.payload.products;
    },
    addClient(state, action) {
      const newClient = action.payload;
      const extractedClients = [];
      for (const client of Object.values(state.clients)) {
        extractedClients.push(client);
      }
      const existingClient = extractedClients.find(
        client => client.id === newClient.id
      );
      if (!existingClient) {
        state.clients[newClient.id] = {
          id: newClient.id,
          name: newClient.name,
          linkedUsers: newClient.linkedUsers,
          availableProducts: newClient.availableProducts,
        };
        for (const user of Object.values(state.users)) {
          if (newClient.linkedUsers.includes(user.id)) {
            user.linkedClients = `${user.linkedClients}, ${newClient.id}`;
          }
        }
        for (const product of Object.values(state.products)) {
          if (newClient.availableProducts.includes(product.id)) {
            product.availableToClients = `${product.availableToClients}, ${newClient.id}`;
          }
        }
      } else {
        const newId = `c${Math.round(Math.random() * 100000)}`;
        state.clients[newId] = {
          id: newId,
          name: newClient.name,
          linkedUsers: newClient.linkedUsers,
          availableProducts: newClient.availableProducts,
        };
        for (const user of Object.values(state.users)) {
          if (newClient.linkedUsers.includes(user.id)) {
            user.linkedClients = `${user.linkedClients}, ${newId}`;
          }
        }
        for (const product of Object.values(state.products)) {
          if (newClient.availableProducts.includes(product.id)) {
            product.availableToClients = `${product.availableToClients}, ${newId}`;
          }
        }
      }
    },
    removeClient(state, action) {
      const removableClient = action.payload;
      state.clients.filter(client => client.id !== removableClient.id);
    },
  },
});

export const stateActions = stateSlice.actions;
export default stateSlice;
