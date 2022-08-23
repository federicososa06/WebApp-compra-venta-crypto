import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { guardarMonedas } from '../features/MonedasSlice';
import { agregarTransaccion } from '../features/TransaccionesSlice';

const FormTransaccion = () => {

    const dispatch = useDispatch();
    const monedas = useSelector(state => state.monedas.monedas)

    const [precio, setPrecio] = useState(0);
    const [error, setError] = useState("Seleccionar una moneda y una cantidad para continuar");

    // obtener el precio de la moneda seleccionada
    const obtenerPrecio = (e) => {
        let idMoneda = document.getElementById("slcMoneda").value;
        let mon;
        monedas.forEach(m => {
            if (m.id === parseInt(idMoneda)) {
                mon = m;
            }
        })
        setPrecio(mon.cotizacion);
    }

    // agregar transacción
    const Comprar = () => {
        NuevaTransaccion(1);
    }
    const Vender = () => {
        NuevaTransaccion(2);
    }
    const NuevaTransaccion = (opn) => {
        try {
            let cantidad = document.getElementById("txtCantidad").value;
            let monedaSlc = document.getElementById("slcMoneda").value;
            let apiKey = localStorage.getItem("apiKey");
            let idUsu = localStorage.getItem("idUsu");

            if (cantidad > 0 && monedaSlc !== "0") {

                let url = "https://crypto.develotion.com/transacciones.php";
                let nuevaTransaccion = {
                    "idUsuario": idUsu,
                    "tipoOperacion": opn,
                    "moneda": monedaSlc,
                    "cantidad": cantidad,
                    "valorActual": precio,
                }
                // nuevaTransaccion = JSON.stringify(nuevaTransaccion);

                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(nuevaTransaccion),
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": apiKey
                    }
                })
                    .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                    .then(data => {

                        let trns = {
                            "id": data.idTransaccion,
                            "usuarios_id": idUsu,
                            "tipo_operacion": opn,
                            "moneda": monedaSlc,
                            "cantidad": cantidad,
                            "valor_actual": precio
                        }
                        //NO MUESTRA EL NOMBRE DE LA MONEDA QUE SE TRANSÓ PERO SI SE MOSTRARÍA SI ID
                        dispatch(agregarTransaccion(trns));
                        alert("Operación realizada con exito");
                    })
                    .catch(msj => {
                        setError(msj);
                        alert(error);
                    })
            } else {
                alert(error);
            }
        } catch (e) {
            setError(e);
            alert(error);
        }
    }

    return (
        <div>
            <h1> Nueva transacción </h1>
            <form className="col-8 p-5">
                <label className="form-label">Seleccionar una moneda
                    <select className="form-control" onChange={obtenerPrecio} id="slcMoneda">
                        <option value="0">Seleccionar moneda</option>
                        {monedas.map(moneda => <option key={moneda.id} value={moneda.id} >{moneda.nombre}</option>)}
                    </select>
                </label><br />

                <label htmlFor='txtCantidad' className="form-label">Cantidad
                    <input type='number' id='txtCantidad' className="form-control" />
                </label><br />

                <label htmlFor='txtValor' className="form-label">
                    <strong>Valor actual {precio}</strong>
                </label><br />

                <input type="button" value="Comprar" id="btnComprar" className="btn btn-success m-3" onClick={Comprar} />
                <input type="button" value="Vender" id="btnVender" className="btn btn-danger m-3" onClick={Vender} />
            </form>
        </div>
    )
}

export default FormTransaccion