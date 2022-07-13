import { usersActions } from './users-slice';

export const fetchUsersData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/users.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch the users data.');
      }

      const data = await response.json();

      return data;
    };
    try {
      const usersData = await fetchData();
      dispatch(usersActions.replaceUsers({ users: usersData || [] }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendUsersData = usersState => {
  return async () => {
    // const sendRequest = async () => {
    // const response =
    await fetch(
      'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/users.json',
      {
        method: 'POST',
        body: JSON.stringify({ users: usersState.users }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
};
