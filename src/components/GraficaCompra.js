import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


const GraficaCompra = () => {

    let listaTransacciones = useSelector(state => state.transacciones.transacciones);
    let listaMonedas = useSelector(state => state.monedas.monedas);
    const [monedas, setMonedas] = useState([]);

    useEffect(() => {
        //crear array nuevo con los datos necesarios y llenarlo con todas las monedas existentes 
        let mon = [];
        listaMonedas.forEach(m => {
            let nuevaMoneda = {
                id: m.id,
                nombre: m.nombre,
                cantidad: 0,
                total: 0,
                imagen: m.imagen
            }
            mon.push(nuevaMoneda);
        })

        //sumar el total de compra de cada moneda
        listaTransacciones.forEach(c => {
            mon.forEach(m => {
                if (c.tipo_operacion === 1 && m.id === c.moneda) {
                    m.total = m.total + c.valor_actual * c.cantidad;
                    m.cantidad = m.cantidad + c.cantidad;
                }
            })
        })

        //quedarse solo con las monedas que se han comprado
        mon = mon.filter(m => m.cantidad > 0);

        //asignar el array creado antes al state del componente
        setMonedas(mon);

    }, [listaTransacciones]);


    const data = {
        labels: monedas.map(m => m.nombre),
        datasets: [
            {
                labels: 'Compras',
                data: monedas.map(m => m.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 139, 64, 0.2)',
                    'rgba(220, 189, 64, 0.2)',
                    'rgba(255, 190, 250, 0.2)',
                    'rgba(35, 159, 64, 0.2)',
                    'rgba(76, 23, 94, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 139, 64, 0.2)',
                    'rgba(220, 189, 64, 0.2)',
                    'rgba(255, 190, 250, 0.2)',
                    'rgba(35, 159, 64, 0.2)',
                    'rgba(76, 23, 94, 0.2)',
                ],
                borderWidth: 1,
                hoverOffset: 4
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
                text: 'Chart.js pie chart',
            },
        },
    }

    return (
        <div>
            <h2>Compras</h2>
            <div>
                <Pie options={options} data={data} />
            </div>
        </div>
    )
}

export default GraficaCompra