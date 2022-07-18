import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommonData } from './store/common-actions';

import Header from './components/Header';
import MainMenu from './pages/MainMenu';
import ClientsMenu from './pages/ClientsMenu';
import UsersMenu from './pages/UsersMenu';
import ProductsMenu from './pages/ProductsMenu';

function App() {
  const dispatch = useDispatch();
  const clientsState = useSelector(state => state.commonState.clients);
  const usersState = useSelector(state => state.commonState.users);
  const productsState = useSelector(state => state.commonState.products);

  useEffect(() => {
    dispatch(fetchCommonData());
  }, [dispatch]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate replace to='/main' />} />
        <Route
          path='/main'
          element={
            <MainMenu
              clients={clientsState}
              users={usersState}
              products={productsState}
            />
          }
        />
        <Route
          path='/clients'
          element={
            <ClientsMenu
              clients={clientsState}
              users={usersState}
              products={productsState}
            />
          }
        />
        <Route
          path='/users'
          element={
            <UsersMenu
              clients={clientsState}
              users={usersState}
              products={productsState}
            />
          }
        />
        <Route
          path='/products'
          element={
            <ProductsMenu
              clients={clientsState}
              users={usersState}
              products={productsState}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
