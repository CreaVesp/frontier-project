import { productsActions } from './products-slice';

export const fetchProductsData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/products.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch the users data.');
      }

      const data = await response.json();

      return data;
    };
    try {
      const productsData = await fetchData();
      dispatch(
        productsActions.replaceProducts({ products: productsData || [] })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendProductsData = productsState => {
  return async () => {
    // const sendRequest = async () => {
    // const response =
    await fetch(
      'https://react-http-54b71-default-rtdb.europe-west1.firebasedatabase.app/frontier-project/users.json',
      {
        method: 'POST',
        body: JSON.stringify({ products: productsState.products }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
};
