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
      const checkedClientID = existingClient
        ? `c${Math.round(Math.random() * 100000)}`
        : newClient.id;

      state.clients[checkedClientID] = {
        id: checkedClientID,
        name: newClient.name,
        linkedUsers: newClient.linkedUsers,
        availableProducts: newClient.availableProducts,
      };

      for (const user of Object.values(state.users)) {
        if (newClient.linkedUsers.includes(user.id)) {
          user.linkedClients = `${user.linkedClients}, ${newClient.id}`;
        }
        if (
          newClient.linkedUsers.includes(user.id) &&
          !user.availableProducts.includes(newClient.availableProducts)
        ) {
          const updatedAvailableProducts = Array.from(
            new Set([
              ...user.availableProducts.split(', '),
              ...newClient.availableProducts.split(', '),
            ])
          ).join(', ');
          user.availableProducts = updatedAvailableProducts;
        }
      }

      for (const product of Object.values(state.products)) {
        if (newClient.availableProducts.includes(product.id)) {
          product.availableToClients = `${product.availableToClients}, ${newClient.id}`;
        }
        if (
          newClient.availableProducts.includes(product.id) &&
          !product.availableToClients.includes(newClient.linkedUsers)
        ) {
          const updatedAvailableToUsers = Array.from(
            new Set([
              ...product.availableToUsers.split(', '),
              ...newClient.linkedUsers.split(', '),
            ])
          ).join(', ');
          product.availableToUsers = updatedAvailableToUsers;
        }
      }
    },
    removeClient(state, action) {
      const removableClientID = action.payload;

      // ⬇ clients пригодждается несколько раз, поэтому вынесен наверх
      const clients = [];
      for (const client of Object.values(state.clients)) {
        clients.push(client);
      }

      ///////////////////////////////////////////
      // ⬇ удаление зависимостей у пользователей
      const users = [];
      for (const user of Object.values(state.users)) {
        users.push(user);
      }

      const newUsersState = {};

      for (const user of Object.values(users)) {
        if (user.linkedClients.includes(removableClientID)) {
          // ⬇ вывести каждого юзера в массив и отфильтровать его так, чтобы user.linkedClients не содержал удаляемого клиента
          const updatedLinkedClients = Array.from(
            user.linkedClients.split(', ')
          )
            .filter(id => id !== removableClientID)
            .join(', ');
          user.linkedClients = updatedLinkedClients;

          // ⬇ проверка на то, содержал ли юзер право на продукт, доступный ТОЛЬКО удаляемому пользователю.
          // Если да, то вернуть доступные продукты оставшегося клиента, привязанного к юзеру
          const newUserAvProds = [];
          const leftLinkedClients = Array.from(
            user.linkedClients.split(', ')
          ).filter(client => client !== removableClientID);
          console.log(leftLinkedClients);
          console.log(leftLinkedClients.join(', ').length);

          if (leftLinkedClients.join(', ').length !== 0) {
            leftLinkedClients.forEach(client =>
              newUserAvProds.push(
                Array.from(
                  new Set(
                    Array.from(
                      state.clients[client].availableProducts.split(', ')
                    ).filter(
                      product =>
                        !Array.from(
                          state.clients[
                            removableClientID
                          ].availableProducts.split(', ')
                        ).includes(product)
                    )
                  )
                ).join(', ')
              )
            );
          }

          user.availableProducts = newUserAvProds.join(', ');
        }
      }
      users.forEach(user => {
        newUsersState[user.id] = {
          id: user.id,
          name: user.name,
          linkedClients: user.linkedClients,
          availableProducts: user.availableProducts,
        };
      });
      console.log(newUsersState);

      ///////////////////////////////////////
      // ⬇ удаление зависимостей у продуктов
      const products = [];
      for (const product of Object.values(state.products)) {
        products.push(product);
      }
      const newProductsState = {};

      for (const product of Object.values(products)) {
        if (product.availableToClients.includes(removableClientID)) {
          const updatedAvailableToClients = Array.from(
            product.availableToClients.split(', ')
          )
            .filter(id => id !== removableClientID)
            .join(', ');
          product.availableToClients = updatedAvailableToClients;
        }
        // ⬇ добавить удаление availableToUsers в соответствии с удаленным клиентом.
        // При удалении юзера в product.availableToUsers остаются продукты
        if (!product.availableToClients) {
          product.availableToUsers = '';
        }
        for (const user of Object.values(users)) {
          if (!user.availableProducts.includes(product.id)) {
            product.availableToUsers = Array.from(
              product.availableToUsers.split(', ')
            )
              .filter(product => !product.includes(user.id))
              .join(', ');
          }
        }
      }
      products.forEach(product => {
        newProductsState[product.id] = {
          id: product.id,
          name: product.name,
          availableToClients: product.availableToClients,
          availableToUsers: product.availableToUsers,
        };
      });
      console.log(newProductsState);

      /////////////////////////////////////
      // ⬇ Удаление самого клиента

      const filteredClients = clients.filter(
        client => client.id !== removableClientID
      );

      const newClientsState = {};
      filteredClients.forEach(client => {
        newClientsState[client.id] = {
          id: client.id,
          name: client.name,
          linkedUsers: client.linkedUsers,
          availableProducts: client.availableProducts,
        };
      });
      console.log(newClientsState);

      // ⬇ итоговое обновление состояния
      state.clients = newClientsState;
      state.users = newUsersState;
      state.products = newProductsState;
    },
  },
});

export const stateActions = stateSlice.actions;
export default stateSlice;
