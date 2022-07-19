import { Fragment, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCommonData } from '../store/common-actions';

import List from '../components/Lists/List';
import AddClientsForm from '../components/UI/AddClientsForm';
import DeleteNotification from '../components/UI/DeleteNotification';

import classes from './Menu.module.css';
import { stateActions } from '../store/common-state';

const ClientsMenu = props => {
  const dispatch = useDispatch();
  const [clientIsChosen, setClientIsChosen] = useState(false);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  const commonState = useSelector(state => state.commonState);

  // Sending the added Client to a database after form was submitted.
  useEffect(() => {
    if (formIsSubmitted) {
      console.log(commonState);
      dispatch(sendCommonData(commonState));
    }
  }, [formIsSubmitted, dispatch, commonState]);

  const clientRef = useRef('');

  const fetchedClients = props.clients;
  const fetchedUsers = props.users;
  const fetchedProducts = props.products;

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
    setShowDeleteNotification(false);
  };

  const deleteUserButtonHandler = () => {
    console.log(clientRef.current.value);
    dispatch(stateActions.removeClient(clientRef.current.value));
    // ⬇ отправка обновленного состояния с удаленным пользователем в базу.
    // dispatch(sendCommonData(commonState));
    setShowDeleteNotification(false);
  };

  const deleteNotificationHandler = () => {
    setShowDeleteNotification(true);
  };

  return (
    <Fragment>
      {showForm && (
        <AddClientsForm
          onHideModal={hideModalHandler}
          users={usersProcessed}
          products={productsProcessed}
          setFormIsSubmitted={setFormIsSubmitted}
        />
      )}
      {showDeleteNotification && (
        <DeleteNotification
          client={fetchedClients[clientRef.current.value].name}
          onHideModal={hideModalHandler}
          deleteHandler={deleteUserButtonHandler}
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
            <button
              className={classes.delete}
              onClick={deleteNotificationHandler}>
              Удалить
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ClientsMenu;
