import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    monedas: [],
    moneda: [],
}


export const monedasSlice = createSlice({
    name: "monedasSlice",
    initialState,
    reducers: {
        guardarMonedas: (state, action) => {
            state.monedas = action.payload;
        },

    }
})

export const { guardarMonedas, obtenerMonedaPorId } = monedasSlice.actions;

export default monedasSlice.reducer;