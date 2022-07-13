import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainMenu from './pages/MainMenu';
import ClientsMenu from './pages/ClientsMenu';
import UsersMenu from './pages/UsersMenu';
import ProductsMenu from './pages/ProductsMenu';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate replace to='/main' />} />
        <Route path='/main' element={<MainMenu />} />
        <Route path='/clients' element={<ClientsMenu />} />
        <Route path='/users' element={<UsersMenu />} />
        <Route path='/products' element={<ProductsMenu />} />
      </Routes>
    </div>
  );
}

export default App;
