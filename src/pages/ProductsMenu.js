import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientsData } from '../store/clients-actions';
import { fetchUsersData } from '../store/users-actions';
import { fetchProductsData } from '../store/products-actions';

import List from '../components/Lists/List';
import classes from './Menu.module.css';

const ProductsMenu = () => {
  const [productIsChosen, setProductIsChosen] = useState(false);
  const [renderedClients, setRenderedClients] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const productRef = useRef('');
  const dispatch = useDispatch();
  const fetchedClients = useSelector(state => state.clients.clients);
  const fetchedUsers = useSelector(state => state.users.users);
  const fetchedProducts = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchClientsData());
    dispatch(fetchUsersData());
    dispatch(fetchProductsData());
  }, [dispatch]);

  const clientsProcessed = [];

  for (const key in fetchedClients) {
    clientsProcessed.push({
      id: fetchedClients[key].id,
      name: fetchedClients[key].name,
      linkedUsers: fetchedClients[key].linkedUsers,
      availableProducts: fetchedClients[key].availableProducts,
    });
  }

  const usersProcessed = [];

  for (const key in fetchedUsers) {
    usersProcessed.push({
      id: fetchedUsers[key].id,
      name: fetchedUsers[key].name,
      linkedClients: fetchedUsers[key].linkedClients,
      availableProducts: fetchedUsers[key].availableProducts,
    });
  }

  const productsProcessed = [];

  for (const key in fetchedProducts) {
    productsProcessed.push({
      id: fetchedProducts[key].id,
      name: fetchedProducts[key].name,
      availableToClients: fetchedProducts[key].availableToClients,
      availableToUsers: fetchedProducts[key].availableToUsers,
    });
  }

  const productsSelector = productsProcessed.map(product => (
    <option key={product.id} value={product.id}>
      {product.name}
    </option>
  ));

  const onSubmitHandler = e => {
    e.preventDefault();
    const chosenProduct = productRef.current.value;

    setRenderedClients(
      clientsProcessed.filter(client =>
        client.availableProducts.includes(chosenProduct)
      )
    );

    setRenderedUsers(
      usersProcessed.filter(user =>
        user.availableProducts.includes(chosenProduct)
      )
    );

    setProductIsChosen(true);
  };

  return (
    <div className={classes.container}>
      <main className={classes.lists}>
        <div className={classes.row}>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor='user' className={classes.description}>
              Выберите продукт:
            </label>
            <select ref={productRef} name='users' id='user'>
              {productsSelector}
            </select>
            <button type='submit'>Выбрать</button>
          </form>
        </div>
        <div className={classes.row}>
          {productIsChosen && (
            <span className={classes.description}>Связанные клиенты</span>
          )}
          {productIsChosen && <List data={renderedClients} />}
        </div>
        <div className={classes.row}>
          {productIsChosen && (
            <span className={classes.description}>Связанные пользователи</span>
          )}
          {productIsChosen && <List data={renderedUsers} />}
        </div>
      </main>
      {productIsChosen && (
        <div className={classes.buttons}>
          <button className={classes.add}>Добавить</button>
          <button className={classes.edit}>Редактировать</button>
          <button className={classes.delete}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default ProductsMenu;
