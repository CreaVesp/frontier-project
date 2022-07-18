import { stateActions } from './common-state';

export const fetchCommonData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch the clients data.');
      }

      const data = await response.json();

      return data;
    };

    try {
      const commonData = await fetchData();
      dispatch(
        stateActions.replaceAll({
          clients: commonData.clients || [],
          users: commonData.users || [],
          products: commonData.products || [],
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendCommonData = commonState => {
  return async () => {
    const sendData = async () => {
      const response = fetch(
        'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            clients: commonState.clients,
            users: commonState.users,
            products: commonState.products,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Something is wrong.');
      }
      const data = await response.json();
      return data;
    };
    try {
      sendData();
    } catch (error) {
      console.log(error.message);
    }
  };
};
// export const sendCommonData = commonState => {
//   return async () => {
//     await fetch(
//       'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project.json',
//       {
//         method: 'PUT',
//         body: JSON.stringify({
//           clients: commonState.clients,
//           users: commonState.users,
//           products: commonState.products,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   };
// };
