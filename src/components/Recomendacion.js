import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerMonedaPorId } from '../features/MonedasSlice';

const Recomendacion = () => {
    let listaMonedas = useSelector(state => state.monedas.monedas);
    const listaTransacciones = useSelector(state => state.transacciones.transacciones);

    const [recomendaciones, setRecomendaciones] = useState([]); //array con las recomendaciones y datos necesarios

    useEffect(() => {

        //llenar el array nuevo con los datos de las monedas y los necesarios para la recomendacion
        let monedas = [];
        listaMonedas.forEach(mon => {
            let nuevaMoneda = {
                nombre: mon.nombre,
                id: mon.id,
                cotizacion: mon.cotizacion,
                difPrecio: 0,
                valorTransaccion: 0,
                imagen: mon.imagen,
                tipo_operacion: 0,
                cantidad: 0,
                recomendacion: "Mantener",
            }
            monedas.push(nuevaMoneda);
        });

        //llenar el array nuevo con los datos de las transacciones y la recomendación
        monedas.forEach(moneda => {
            listaTransacciones.forEach(transa => {
                if (transa.moneda === moneda.id) {

                    moneda.tipo_operacion = transa.tipo_operacion;
                    moneda.cantidad = transa.cantidad;
                    moneda.valorTransaccion = transa.valor_actual;

                    //ver variacion de precio
                    moneda.difPrecio = transa.valor_actual - moneda.cotizacion;

                    //Si la última operación de la moneda fue de compra y ahora el valor de la moneda es mayor
                    // que al momento de la compra la aplicación sugerirá vender
                    if (transa.tipo_operacion === 1 && moneda.cotizacion > transa.valor_actual) {
                        moneda.recomendacion = "Vender";
                    }
                    if (transa.tipo_operacion === 2 && moneda.cotizacion < transa.valor_actual) {
                        moneda.recomendacion = "Comprar";
                    }

                }
            })
        })

        setRecomendaciones(monedas);

    }, [listaMonedas])


    return (
        <div>
            <h1>Sugerencias IA </h1>
            <table className="table table-striped">
                <thead >
                    <tr>
                        <th scope="col">Moneda</th>
                        <th scope="col">Tipo operacion</th>
                        <th scope="col">Precio transaccion</th>
                        <th scope="col">Valor Actual</th>
                        <th scope="col">Diferencia de precio</th>
                        <th scope="col">Recomendacion IA</th>
                    </tr>
                </thead>
                <tbody>
                    {recomendaciones.map(transa =>
                        <tr key={transa.id}>
                            <td> {transa.nombre} </td>
                            {transa.tipo_operacion === 1 ?
                                <td>Compra </td> : <td>Venta </td>}
                            <td>{transa.valorTransaccion}</td>
                            <td>{transa.cotizacion}</td>
                            <td>{transa.difPrecio}</td>
                            <td> {transa.recomendacion}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recomendacion