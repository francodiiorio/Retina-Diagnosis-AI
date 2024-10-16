import React from 'react';
import styles from './Perfil.module.css';
import Button from '../../../shared/components/FormElements/Button';

const Perfil = () => {
    return (
        <div className={styles.container}>
            <div className={styles.datos}>
                <h1 className={styles.NombreUsuario}>Nombre Usuario</h1>
                <h2>Email: </h2>
                <h2>Edad: </h2>
                <h2>Sexo: </h2>
                <h2>Diagnóstico: </h2>
                <Button>Editar</Button>
            </div>
            

            <div className={styles.imageContainer}>
                <img src="/Retina.jpg" alt="Imagen 1" className={styles.imagen} />
                <img src="/Retina2.webp" alt="Imagen 2" className={styles.imagen} />
                <img src="/Retina3.jpg" alt="Imagen 2" className={styles.imagen} />
                <img src="/Retina4.jpg" alt="Imagen 2" className={styles.imagen} />
                <img src="/Retina.jpg" alt="Imagen 2" className={styles.imagen} />
                <img src="/Retina3.jpg" alt="Imagen 2" className={styles.imagen} />

            </div>
        </div>
    );
};

export default Perfil;
