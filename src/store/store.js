import { configureStore } from '@reduxjs/toolkit';
import monedasReducer from '../features/MonedasSlice';
import transaccionesReducer from '../features/TransaccionesSlice';

export const store = configureStore({
    reducer: {
        monedas: monedasReducer,
        transacciones: transaccionesReducer,
        compras : transaccionesReducer,
        ventas : transaccionesReducer,
        inversion : transaccionesReducer
    }
})