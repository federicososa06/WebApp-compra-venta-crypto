import ListaTransacciones from './ListaTransacciones'
import FormTransaccion from './FormTransaccion'
import Inversion from './Inversion'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { guardarMonedas } from '../features/MonedasSlice';
import { guardarTransacciones } from '../features/TransaccionesSlice';
import Graficos from './Graficos';
import Recomendacion from './Recomendacion';

const Transacciones = () => {

    const dispatch = useDispatch();

    let navigate = useNavigate();
    useEffect(() => {

        let usu = localStorage.getItem("idUsu");
        if (usu === "0") {
            navigate("/");
        }

        try {
            const apiKey = localStorage.getItem("apiKey");

            // cargar las monedas en el listado global
            const urlMonedas = `https://crypto.develotion.com/monedas.php`;
            fetch(urlMonedas, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": apiKey
                }
            })
                .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                .then(data => {
                    dispatch(guardarMonedas(data.monedas))
                })
                .catch(msj => alert(msj))


            // cargar transacciones en el listado global
            const idUsu = localStorage.getItem("idUsu");
            const urlTransacciones = `https://crypto.develotion.com/transacciones.php?idUsuario=${idUsu}`;

            fetch(urlTransacciones, {
                method: "GET",
                headers: {
                    "Content-Type": "application-json",
                    "apikey": apiKey
                }
            })
                .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                .then(data => {
                    dispatch(guardarTransacciones(data.transacciones))
                })
                .catch(msj => alert(msj))

        } catch (error) {
            alert(error);
        }
    }, [])

    return (
        <div>
            <div className='transacciones'>
                <FormTransaccion />
                <ListaTransacciones />
                <Inversion />
                <Graficos />
                <Recomendacion />
            </div>
            <Outlet />
        </div>
    )
}

export default Transacciones