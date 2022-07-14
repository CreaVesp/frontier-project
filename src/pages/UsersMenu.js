import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientsData } from '../store/clients-actions';
import { fetchUsersData } from '../store/users-actions';
import { fetchProductsData } from '../store/products-actions';

import List from '../components/Lists/List';

import classes from './Menu.module.css';

const UsersMenu = () => {
  const [userIsChosen, setUserIsChosen] = useState(false);
  const [renderedClient, setRenderedClient] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const userRef = useRef('');
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

  const usersSelector = usersProcessed.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSubmitHandler = e => {
    e.preventDefault();
    const chosenUser = userRef.current.value;
    // console.log(chosenClient);

    setRenderedClient(
      clientsProcessed.filter(client => client.linkedUsers.includes(chosenUser))
    );
    // console.log(renderedUsers);
    setRenderedProducts(
      productsProcessed.filter(product =>
        product.availableToUsers.includes(chosenUser)
      )
    );
    console.log(renderedProducts);

    setUserIsChosen(true);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.row}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor='user' className={classes.description}>
            Выберите пользователя:
          </label>
          <select ref={userRef} name='users' id='user'>
            {usersSelector}
          </select>
          <button type='submit'>Выбрать</button>
        </form>
      </div>
      <div className={classes.row}>
        {userIsChosen && (
          <span className={classes.description}>Связанный клиент</span>
        )}
        {userIsChosen && <List data={renderedClient} />}
      </div>
      <div className={classes.row}>
        {userIsChosen && (
          <span className={classes.description}>
            Продукты, доступные пользователю
          </span>
        )}
        {userIsChosen && <List data={renderedProducts} />}
      </div>
    </div>
  );
};

export default UsersMenu;
