import { clientsActions } from './clients-slice';

export const fetchClientsData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/clients.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch the clients data.');
      }

      const data = await response.json();

      return data;
    };

    try {
      const clientsData = await fetchData();
      dispatch(clientsActions.replaceClients({ clients: clientsData || [] }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendClientsData = clientsState => {
  return async () => {
    // const sendRequest = async () => {
    // const response =
    await fetch(
      'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/clients.json',
      {
        method: 'POST',
        body: JSON.stringify({ clients: clientsState.clients }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
};
