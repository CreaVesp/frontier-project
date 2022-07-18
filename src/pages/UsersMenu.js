import { useRef, useState } from 'react';

import List from '../components/Lists/List';

import classes from './Menu.module.css';

const UsersMenu = props => {
  const [userIsChosen, setUserIsChosen] = useState(false);
  const [renderedClient, setRenderedClient] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const userRef = useRef('');

  const fetchedClients = props.clients;
  const fetchedUsers = props.users;
  const fetchedProducts = props.products;

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

    setRenderedClient(
      clientsProcessed.filter(client => client.linkedUsers.includes(chosenUser))
    );

    setRenderedProducts(
      productsProcessed.filter(product =>
        product.availableToUsers.includes(chosenUser)
      )
    );
    console.log(renderedProducts);

    setUserIsChosen(true);
  };

  return (
    <div className={classes.container}>
      <main className={classes.lists}>
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
            <span className={classes.description}>Доступные продукты</span>
          )}
          {userIsChosen && <List data={renderedProducts} />}
        </div>
      </main>
      {userIsChosen && (
        <div className={classes.buttons}>
          <button className={classes.add}>Добавить</button>
          <button className={classes.edit}>Редактировать</button>
          <button className={classes.delete}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default UsersMenu;
