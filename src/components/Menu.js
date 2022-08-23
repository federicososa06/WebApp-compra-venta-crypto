import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';

const Menu = () => {

    const cerrarSesion = (e) => {
        alert("Cerrar sesion");
        localStorage.clear();
        localStorage.setItem("idUsu", 0);
    }

    return (
        <div>
            <div className='menu'>

                <h1>crypto app</h1>

                <NavLink to="/">Login  </NavLink> /
                <NavLink to="/registro">Registro  </NavLink> /
                <NavLink to="/transacciones">Transacciones  </NavLink> /
                <NavLink to="/" onClick={cerrarSesion}> Cerrar Sesion  </NavLink> /
                
            </div>
            <Outlet />
        </div>
    )
}

export default Menu