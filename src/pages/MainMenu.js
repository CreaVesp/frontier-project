import { Fragment } from 'react';

import List from '../components/Lists/List';

import classes from './Menu.module.css';

const MainMenu = props => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.lists}>
          <div className={classes.row}>
            <span className={classes.description}>Наши клиенты</span>
            <List data={props.clients} />
          </div>
          <div className={classes.row}>
            <span className={classes.description}>Список пользователей</span>
            <List data={props.users} />
          </div>
          <div className={classes.row}>
            <span className={classes.description}>Наши продукты</span>
            <List data={props.products} />
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
