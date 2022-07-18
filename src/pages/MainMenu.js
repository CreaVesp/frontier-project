import { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommonData } from '../store/common-actions';

import List from '../components/Lists/List';

import classes from './Menu.module.css';

const MainMenu = () => {
  const dispatch = useDispatch();
  const clientsState = useSelector(state => state.commonState.clients);
  const usersState = useSelector(state => state.commonState.users);
  const productsState = useSelector(state => state.commonState.products);

  useEffect(() => {
    dispatch(fetchCommonData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.lists}>
          <div className={classes.row}>
            <span className={classes.description}>Наши клиенты</span>
            <List data={clientsState} />
          </div>
          <div className={classes.row}>
            <span className={classes.description}>Список пользователей</span>
            <List data={usersState} />
          </div>
          <div className={classes.row}>
            <span className={classes.description}>Наши продукты</span>
            <List data={productsState} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainMenu;

// const CUSTOMERS = [
//   { id: Math.round(Math.random() * 100), name: 'Banking Solutions' },
//   { id: Math.round(Math.random() * 100), name: 'Logistics Consulting' },
// ];

// const USERS = [
//   { id: Math.round(Math.random() * 100), name: 'Kaspi Bank' },
//   { id: Math.round(Math.random() * 100), name: 'Alfa Bank' },
//   { id: Math.round(Math.random() * 100), name: 'Atasu Logistics' },
//   { id: Math.round(Math.random() * 100), name: 'CEVA Logistics' },
// ];

// const PRODUCTS = [
//   { id: Math.round(Math.random() * 100), name: 'Banking Dashboard' },
//   { id: Math.round(Math.random() * 100), name: 'Financial Datasheet' },
//   { id: Math.round(Math.random() * 100), name: 'Cashflow Dashboard' },
//   { id: Math.round(Math.random() * 100), name: 'Transport Dashboard' },
//   { id: Math.round(Math.random() * 100), name: 'Logistics CRM' },
//   { id: Math.round(Math.random() * 100), name: 'Interactive Railroads Map' },
// ];
