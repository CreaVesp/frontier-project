import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientsData } from '../store/clients-actions';
import { fetchUsersData } from '../store/users-actions';
import { fetchProductsData } from '../store/products-actions';

import List from '../components/Lists/List';

import classes from './Menu.module.css';

const ClientsMenu = () => {
  const [clientIsChosen, setClientIsChosen] = useState(false);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const clientRef = useRef('');
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
    });
  }

  const clientsSelector = clientsProcessed.map(client => (
    <option key={client.id} value={client.id}>
      {client.name}
    </option>
  ));

  const onSubmitHandler = e => {
    e.preventDefault();
    const chosenClient = clientRef.current.value;

    setRenderedUsers(
      usersProcessed.filter(user => user.linkedClients.includes(chosenClient))
    );

    setRenderedProducts(
      productsProcessed.filter(product =>
        product.availableToClients.includes(chosenClient)
      )
    );

    setClientIsChosen(true);
  };

  return (
    <div className={classes.container}>
      <main className={classes.lists}>
        <div className={classes.row}>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor='client' className={classes.description}>
              Выберите клиента:
            </label>
            <select ref={clientRef} name='clients' id='client'>
              {clientsSelector}
            </select>
            <button type='submit'>Выбрать</button>
          </form>
        </div>
        <div className={classes.row}>
          {clientIsChosen && (
            <span className={classes.description}>Связанные пользователи</span>
          )}
          {clientIsChosen && <List data={renderedUsers} />}
        </div>
        <div className={classes.row}>
          {clientIsChosen && (
            <span className={classes.description}>Доступные продукты</span>
          )}
          {clientIsChosen && <List data={renderedProducts} />}
        </div>
      </main>
      {clientIsChosen && (
        <div className={classes.buttons}>
          <button className={classes.add}>Добавить</button>
          <button className={classes.edit}>Редактировать</button>
          <button className={classes.delete}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default ClientsMenu;
