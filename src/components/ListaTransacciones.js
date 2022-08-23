import { React } from "react"
import { useSelector } from "react-redux";
// import { guardarTransacciones } from "../features/TransaccionesSlice";

const ListaTransacciones = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);

    // const monedas = useSelector(state => state.monedas.monedas);
    // const ObtenerNombreMoneda = (idMoneda) => {
    //     let nombre = "";
    //     monedas.forEach(m => {
    //         if (m.id === idMoneda) {
    //             nombre = m.nombre;
    //         }
    //     })
    //     return nombre;
    // }

    return (
        <div>
            <h1 >Lista de transacciones</h1>
            <table className="table table-striped">
                <thead >
                    <tr>
                        <th scope="col">Moneda</th>
                        <th scope="col">Tipo operacion</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.map(transa =>
                        <tr key={transa.id}>

                            {/* NO MUESTRA EL NOMBRE DE LA MONEDA QUE SE TRANSÓ PERO SI SE MOSTRARÍA SI ID */}
                            {/* <td> {ObtenerNombreMoneda(transa.moneda)} </td> */}

                            <td> {transa.moneda} </td>
                            {transa.tipo_operacion === 1 ?
                                <td>Compra </td> : <td>Venta </td>}
                            <td>{transa.cantidad}</td>
                            <td>{transa.valor_actual}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListaTransacciones