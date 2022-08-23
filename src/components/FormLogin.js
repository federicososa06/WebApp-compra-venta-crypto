import React, { useRef, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom';

const FormLogin = () => {

    const [vacio, setVacio] = useState(true);

    const txtUsuario = useRef(null);
    const txtContra = useRef(null);

    const habBtn = (e) => {
        if (txtUsuario && txtContra) {
            setVacio(false);
        }
    }

    const login = (e) => {
        try {
            let usu = txtUsuario.current.value;
            let contra = txtContra.current.value;

            if (!usu) {
                throw new Error("Ingresar un nombre de usuario");
            }
            if (!contra) {
                throw new Error("Ingresar la contraseña");
            }

            let url = "https://crypto.develotion.com/login.php";
            let body = {
                "usuario": usu,
                "password": contra
            }

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                .then(data => {
                    alert("Bienvenido " + data.id);
                    localStorage.setItem("apiKey", data.apiKey);
                    localStorage.setItem("idUsu", data.id);
                    <NavLink to="/transacciones"> </NavLink>
                })
                .catch(msj => alert(msj))
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <form className="col-8 p-5">
                <label htmlFor='txtUsuarioLogin' className="form-label">Nombre de usuario
                    <input type='text' id='txtUsuarioLogin' className="form-control" ref={txtUsuario} onChange={habBtn} />
                </label><br />

                <label htmlFor='txtContraseniaLogin' className="form-label">Contraseña
                    <input type='password' id='txtContraseniaLogin' className="form-control" ref={txtContra} onChange={habBtn} />
                </label><br />

                <input type="button" value="Ingresar" id="btnLogin" className="btn btn-outline-primary m-3" onClick={login} disabled={vacio} />
                {/* <a href="">No estoy registrado </a> */}
            </form>
        </div>
    )
}

export default FormLogin