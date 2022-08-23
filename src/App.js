import './App.css';
import FormLogin from './components/FormLogin';
import FormRegistro from './components/FormRegistro';
import Transacciones from './components/Transacciones';
import FormTransaccion from './components/FormTransaccion';
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaTransacciones from './components/ListaTransacciones';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Menu />}>
            <Route path='/' element={<FormLogin />} />
            <Route path='/registro' element={<FormRegistro />} />
            <Route path='/transacciones' element={<Transacciones />}>
              <Route path='/transacciones/transar' element={<FormTransaccion />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </Provider>
  );
}

export default App;
