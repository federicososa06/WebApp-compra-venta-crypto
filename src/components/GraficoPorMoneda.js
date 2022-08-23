import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const GraficaPorMoneda = () => {

    let listaTransacciones = useSelector(state => state.transacciones.transacciones);
    let listaMonedas = useSelector(state => state.monedas.monedas);

    const [transaMonedaSlc, setTransaMonedaSlc] = useState([]);//guardar las transacciones de la moneda seleccionada
    const [compras, setCompras] = useState([]) //guardar las compras de esa moneda seleccionada
    const [ventas, setVentas] = useState([]) //guardar las compras de esa moneda seleccionada

    const MostrarGrafica = () => {
        let idMoneda = document.getElementById("slcMonedas").value;

        //obtener las transacciones de la moneda seleccionada
        let transa = [];
        transa = listaTransacciones.filter(t => t.moneda === parseInt(idMoneda));

        let com = [];
        com = transa.filter(t => t.tipo_operacion === 1);

        let ven = [];
        ven = transa.filter(t => t.tipo_operacion === 2);

        //setear el array de transacciones de la moneda en el state global
        setTransaMonedaSlc(transa);
        setCompras(com);
        setVentas(ven);
    }


    useEffect(() => {
        //rellenar array monedas
        document.getElementById("slcMonedas").innerHTML = "";
        listaMonedas.forEach(m => {
            document.getElementById("slcMonedas").innerHTML +=
                `<option value=${m.id}>${m.nombre}</option>`
        })

    }, [listaMonedas]);

    //datos para la grafica
    const data = {
        labels: transaMonedaSlc.map(t => t.cantidad),
        datasets: [
            {
                label: 'Precio de compra',
                data: compras.map(c => c.valor_actual),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Precio de compra',
                data: ventas.map(v => v.valor_actual),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cotizacion al momento de la transacción',
            },
        },
    }

    return (
        <div>
            <h2>Grafica por moneda</h2>
            <div>
                <label htmlFor="slcMonedas">Seleccione moneda</label>
                <select id='slcMonedas' placeholder='Seleccionar moneda'></select>
                <input type="button" value="mostrar" onClick={MostrarGrafica}></input>
            </div>
            <div>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}

export default GraficaPorMoneda