import { useRef } from 'react';
import Modal from './Modal';

import './AddForm.css';

const AddClientsForm = props => {
  const nameRef = useRef('');
  const usersRef = useRef([]);
  const productsRef = useRef([]);

  const users = props.users;
  const products = props.products;

  const usersSelector = users.map(user => (
    <div className='checkbox'>
      <input
        ref={usersRef}
        type='checkbox'
        id='user'
        name='user'
        value={user.id}
      />
      <label htmlFor='user'>{user.name}</label>
    </div>
  ));

  const productsSelector = products.map(product => (
    <div className='checkbox'>
      <input
        ref={productsRef}
        type='checkbox'
        id='product'
        name='product'
        value={product.id}
      />
      <label htmlFor='product'>{product.name}</label>
    </div>
  ));

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(nameRef, usersRef, productsRef);
    console.log('some shit is definetly going on');
  };

  return (
    <Modal onHideModal={props.onHideModal}>
      <div>
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
      </div>
    </Modal>
  );
};

export default AddClientsForm;
