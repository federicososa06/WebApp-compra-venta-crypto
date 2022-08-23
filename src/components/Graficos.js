import React from 'react'
import GraficaCompra from './GraficaCompra';
import GraficaPorMoneda from './GraficoPorMoneda';
import GraficoVenta from './GraficoVenta';

const Graficos = () => {
    return (
        <div>
            <h1>Gráficas</h1>
            <GraficaCompra />
            <GraficoVenta />
            <GraficaPorMoneda />
        </div>
    )
}

export default Graficos