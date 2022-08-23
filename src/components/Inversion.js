import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calcularInversion } from '../features/TransaccionesSlice'

const Inversion = () => {
    const compras = useSelector(state => state.transacciones.compras)
    const ventas = useSelector(state => state.transacciones.ventas)
    const inversion = useSelector(state => state.transacciones.inversion)
    const dispatch = useDispatch();
    const transacciones = useSelector(state => state.transacciones.transacciones);

    // dispatch(calcularInversion());

    useEffect(() => {

        calcular();

    }, [transacciones])


    const calcular = () => {
        dispatch(calcularInversion());

    }

    return (
        <div>
            <h1>Inversion</h1>
            <h2>Total compra: {compras}</h2>
            <h2>Total ventas: {ventas}</h2>
            <h2>Pérdida/Ganancia {inversion}</h2>
            <input type="button" value="Calcular" onClick={calcular}></input>
        </div>
    )
}

export default Inversion