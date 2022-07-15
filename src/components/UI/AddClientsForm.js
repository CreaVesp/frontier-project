import { Fragment, useRef, useState } from 'react';
import Modal from './Modal';

import './AddForm.css';

const AddClientsForm = props => {
  const [userIsChecked, setUserIsChecked] = useState([]);
  const [productIsChecked, setProductIsChecked] = useState([]);

  const nameRef = useRef('');
  const usersRef = useRef([]);
  const productsRef = useRef([]);

  const users = props.users;
  const products = props.products;

  // ⬇ Handlers
  const userCheckedHandler = e => {
    console.log(e.target.value);
    let updatedList = [...userIsChecked];
    if (e.target.checked) {
      updatedList = [...userIsChecked, e.target.value];
    } else {
      updatedList.splice(userIsChecked.indexOf(e.target.value), 1);
    }
    // setUserIsChecked(updatedList);
    setUserIsChecked(prevState => prevState.push(...updatedList));
    console.log(userIsChecked);
  };

  const productCheckedHandler = e => {
    let updatedList = [...productIsChecked];
    if (e.target.productIsChecked) {
      updatedList = [...productIsChecked, e.target.value];
    } else {
      updatedList.splice(productIsChecked.indexOf(e.target.value), 1);
    }
    setProductIsChecked(prevState => prevState.concat(updatedList));
    console.log(productIsChecked);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const newClient = {
      name: nameRef,
      linkedUsers: usersRef,
      availableProducts: productsRef,
      id: `c${Math.trunc(Math.random() * 1000)}`,
    };
    console.log(newClient);
    console.log('some shit is definetly going on');
  };

  // ⬇ Lists of checkboxes
  const usersSelector = users.map((user, index) => (
    <div ref={usersRef} className='checkbox' key={index}>
      <input
        type='checkbox'
        id='user'
        name='user'
        value={user.id}
        onChange={userCheckedHandler}
      />
      <label htmlFor='user'>{user.name}</label>
    </div>
  ));

  const productsSelector = products.map((product, index) => (
    <div ref={productsRef} className='checkbox' key={index}>
      <input
        type='checkbox'
        id='product'
        name='product'
        value={product.id}
        onChange={productCheckedHandler}
      />
      <label htmlFor='product'>{product.name}</label>
    </div>
  ));

  return (
    <Modal onHideModal={props.onHideModal}>
      <Fragment>
        <form onSubmit={onSubmitHandler} className='form'>
          <div className='input'>
            <label htmlFor='name' className='description'>
              Наименование клиента
            </label>
            <input ref={nameRef} id='name'></input>
          </div>
          <div className='input'>
            <label htmlFor='users' className='description'>
              Привяжите пользователей
            </label>
            {usersSelector}
          </div>
          <div className='input'>
            <label htmlFor='products' className='description'>
              Доступные продукты
            </label>
            {productsSelector}
          </div>
        </form>
        <div className='buttons-panel'>
          <button type='submit' className='btn btn--submit'>
            Подтвердить
          </button>
          <button onClick={props.onHideModal} className='btn btn--cancel'>
            Отмена
          </button>
        </div>
      </Fragment>
    </Modal>
  );
};

export default AddClientsForm;
