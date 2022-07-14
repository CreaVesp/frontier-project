import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientsData } from '../store/clients-actions';
import { fetchUsersData } from '../store/users-actions';
import { fetchProductsData } from '../store/products-actions';

import List from '../components/Lists/List';
import AddClientsForm from '../components/UI/AddClientsForm';

import classes from './Menu.module.css';

const ClientsMenu = () => {
  const [clientIsChosen, setClientIsChosen] = useState(false);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const clientRef = useRef('');

  const dispatch = useDispatch();

  const fetchedClients = useSelector(state => state.clients.clients);
  const fetchedUsers = useSelector(state => state.users.users);
  const fetchedProducts = useSelector(state => state.products.products);

  // ⬇ fetching required data for post-processing
  useEffect(() => {
    dispatch(fetchClientsData());
    dispatch(fetchUsersData());
    dispatch(fetchProductsData());
  }, [dispatch]);

  // ⬇ Transforming fetched data.
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

  // Click handlers ⬇
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

  const addUserButtonHandler = () => {
    setShowForm(true);
  };
  const hideModalHandler = () => {
    setShowForm(false);
  };

  return (
    <Fragment>
      {showForm && (
        <AddClientsForm
          onHideModal={hideModalHandler}
          users={usersProcessed}
          products={productsProcessed}
        />
      )}
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
              <span className={classes.description}>
                Связанные пользователи
              </span>
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
            <button onClick={addUserButtonHandler} className={classes.add}>
              Добавить
            </button>
            <button className={classes.edit}>Редактировать</button>
            <button className={classes.delete}>Удалить</button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ClientsMenu;
