import React from 'react';
import './Perfil.css';

const Perfil = () => {
    return (
        <div className="container">
            <div className="datos">
                <h1 className="NombreUsuario">Nombre Usuario</h1>
                <h2>Email: </h2>
                <h2>Edad: </h2>
                <h2>Sexo: </h2>
                <h2>Diagnóstico: </h2>
                <button className="editar">Editar perfil</button>
            </div>
            

            <div className="imageContainer">
                <img src="/Retina.jpg" alt="Imagen 1" className="imagen" />
                <img src="/Retina2.webp" alt="Imagen 2" className="imagen" />
                <img src="/Retina3.jpg" alt="Imagen 2" className="imagen" />
                <img src="/Retina4.jpg" alt="Imagen 2" className="imagen" />
                <img src="/Retina.jpg" alt="Imagen 2" className="imagen" />
                <img src="/Retina3.jpg" alt="Imagen 2" className="imagen" />

            </div>
        </div>
    );
};

export default Perfil;
