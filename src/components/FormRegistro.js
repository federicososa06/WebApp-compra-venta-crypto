import React, { useEffect, useRef, useState } from 'react'

const FormRegistro = () => {

    const [dptos, setDeptos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    const txtUsuario = useRef(null);
    const txtContra1 = useRef(null);
    const txtContra2 = useRef(null);
    const slcDpto = useRef(null);
    const slcCiudad = useRef(null);

    const registro = (e) => {
        try {
            let usu = txtUsuario.current.value;
            let contra1 = txtContra1.current.value;
            let contra2 = txtContra2.current.value;
            let dpto = slcDpto.current.value;
            let ciudad = slcCiudad.current.value;

            if (!usu) {
                throw new Error("Ingresar un usuario");
            }
            if (!contra1 || !contra2) {
                throw new Error("Ingresar la contraseña");
            }
            if (contra1 !== contra2) {
                throw new Error("Las contraseñas no coinciden");
            }
            if (!dpto) {
                throw new Error("Seleccionar un departamento");
            }
            if (!ciudad) {
                throw new Error("Seleccionar una ciudad");
            }

            let body = {
                "usuario": usu,
                "password": contra1,
                "idDepartamento": dpto,
                "idCiudad": ciudad
            }
            let url = "https://crypto.develotion.com/usuarios.php";
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                header: {
                    "Content-Type": "application/json"
                },
            })
                .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                .then(data => alert("Registro exitoso " + data.codigo))
                .catch(msj => alert(msj))

        } catch (e) {
            alert(e);
        }

    }

    const obtenerCiudades = (e) => {
        try {
            let idDpto = document.getElementById("slcDptos").value;
            let url = `https://crypto.develotion.com/ciudades.php?idDepartamento=${idDpto}`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data.mensaje)))
                .then(data => {
                    setCiudades(data.ciudades)
                })
                .catch(msj => alert(msj));
        } catch (error) {
            alert(error);
        }

    }

    useEffect(() => {
        try {
            let url = "https://crypto.develotion.com/departamentos.php";
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                // .then(res => res.json())
                .then(res => res.ok ? res.json() : res.json().then(Promise.reject(data => data.mensaje)))
                .then(data => setDeptos(data.departamentos))
                .catch(msj => alert(msj));
        } catch (error) {
            alert(error);
        }
    }, [])

    return (
        <div className="row align-items-center">
            < form className="col-8 p-5">
                <label htmlFor="txtUsuario" className="form-label">Ingresar usuario
                    <input type="text" name='txtUsuario' id='txtUsuario' className="form-control" ref={txtUsuario} />
                </label><br />

                <label htmlFor="txtContrasenia1" className="form-label">Ingresar una contraseña
                    <input type="password" name='txtContrasenia1' id='txtContrasenia1' className="form-control" ref={txtContra1} />
                </label><br />

                <label htmlFor="txtContrasenia2" className="form-label">Repetir contraseña
                    <input type="password" name='txtContrasenia2' id='txtContrasenia2' className="form-control" ref={txtContra2} />
                </label><br />

                < label htmlFor='slcDptos' className="form-label">Seleccionar departamento..
                    <select id='slcDptos' onChange={obtenerCiudades} className="form-control" ref={slcDpto}>
                        {dptos.map(dpto => <option key={dpto.id} value={dpto.id}> {dpto.nombre} </option>)}
                    </select>
                </label><br />

                <label htmlFor='slcCiudades' className="form-label">Seleccionar ciudad..
                    <select id='slcCiudades' className="form-control" ref={slcCiudad}>
                        {ciudades.map(ciudad => <option key={ciudad.id} value={ciudad.id}> {ciudad.nombre} </option>)}
                    </select>
                </label><br />

                <input type="button" value="Registrarse" id="btnRegistro" onClick={registro} className="btn btn-outline-primary m-3" /><br />
                {/* <a href="">Ya estoy registrado!</a> */}
            </form >
        </div >
    )
}

export default FormRegistro