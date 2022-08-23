import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transacciones: [],
    compras: 0,
    ventas: 0,
    inversion: 0,
}

export const transaccionesSlice = createSlice({
    name: "transaccionesSlice",
    initialState,
    reducers: {
        guardarTransacciones: (state, action) => {
            state.transacciones = action.payload;
        },
        agregarTransaccion: (state, action) => {
            state.transacciones.push(action.payload);
        },
        calcularInversion: (state) => {
            let totalCompra = 0;
            let totalVenta = 0;

            state.transacciones.forEach(trns => {
                trns.tipo_operacion === 1 ?
                    totalCompra += trns.valor_actual * trns.cantidad :
                    totalVenta += trns.valor_actual * trns.cantidad;
            });

            state.compras = totalCompra;
            state.ventas = totalVenta;
            state.inversion = totalCompra - totalVenta;
        }
    }
})

export const { guardarTransacciones, agregarTransaccion, calcularInversion } = transaccionesSlice.actions;

export default transaccionesSlice.reducer;