import React from 'react';
import style from './Perfil.module.css';

const Perfil = () => {
    return (
        <div className={style.container}>
            <h1 className={style.NombreUsuario}>Nombre Usuario</h1>
            <div className={style.datos}>
                <h2>datos del usuario:</h2>
                <h2>Email: </h2>
                <h2>Edad: </h2>
                <h2>Sexo: </h2>
                <h2>Diagnóstico: </h2>
            </div>
            <button className={style.editar}>Editar perfil</button>

            <div className={style.imageContainer}>
                <img src="/Retina.jpg" alt="Imagen 1" className={style.imagen} />
                <img src="/Retina2.webp" alt="Imagen 2" className={style.imagen} />
                <img src="/Retina3.jpg" alt="Imagen 2" className={style.imagen} />
                <img src="/Retina4.jpg" alt="Imagen 2" className={style.imagen} />
                <img src="/Retina.jpg" alt="Imagen 2" className={style.imagen} />
                <img src="/Retina3.jpg" alt="Imagen 2" className={style.imagen} />


            </div>
        </div>
    );
};

export default Perfil;
