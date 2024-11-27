import React, { useContext, useEffect, useState } from "react";
import StudyList from "../components/StudyList/StudyList";
import Modal from "../../Shared/components/UIElements/Modal/Modal";
import ImageUploader from "../../Shared/components/FormElements/ImageUploader/ImageUploader";
import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner/LoadingSpinner" 

import styles from "./studies.module.css"

const Studies = () => {
    const auth = useContext(AuthContext);
    const [studies, setStudies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [imagen, setImagen] = useState(null); // Estado para guardar la imagen
    const { sendRequest, isLoading} = useHttpClient();
    const [showNotificationModal, setShowNotificationModal] = useState(false); // Controla el modal de notificaciones
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest('http://localhost:3000/imagenes', 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                setStudies(responseData.images);
            } catch (err) {}
        };
        fetchPlaces();
    }, [sendRequest, auth.token]);

    const openModalHandler = () => setShowModal(true);
    const closeModalHandler = () => {
        setShowModal(false)
        setImagen(null);
    };

    const deleteStudyHandler = async (fecha, horario) => {
        try {
            await sendRequest(
                `http://localhost:3000/users/deleteResult/${fecha}/${horario}`,
                'DELETE',
                null,
                { Authorization: 'Bearer ' + auth.token }
            );

            // Actualizar el estado local después de eliminar el estudio
            const responseData = await sendRequest('http://localhost:3000/imagenes', 'GET', null, {
                Authorization: 'Bearer ' + auth.token
            });
            setStudies(responseData.images);
            setNotificationMessage('Estudio eliminado correctamente.');
            setShowNotificationModal(true);
        } catch (err) {
            setNotificationMessage('No se pudo eliminar el estudio. Intentá de nuevo.');
            setShowNotificationModal(true);
        }
    };

    const closeNotificationModal = () => {
        setShowNotificationModal(false);
        setNotificationMessage('');
    };

    const verificarRetina = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
    
        try {
            const responseData = await sendRequest(
                'http://localhost:3000/isRetina',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            );
    
            return responseData.result; // Suponiendo que `result` es lo que esperas
        } catch (error) {
            console.error('Error al verificar la imagen:', error);
            return false; // Asegúrate de devolver un valor para detener el flujo
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
    
        if (!imagen) {
            setNotificationMessage('Por favor selecciona una imagen.');
            closeModalHandler()
            setShowNotificationModal(true);
            return;
        }

        const esRetina = await verificarRetina(imagen);
        if (!esRetina) {
            closeModalHandler()
            setNotificationMessage('Error, La imagen no es retina. Por favor, selecciona una imagen válida.');
            setShowNotificationModal(true);
          return; 
        }
    
        const formData = new FormData();
        formData.append('file', imagen);
    
        try {
            // Utiliza sendRequest para que isLoading refleje el estado de carga
            await sendRequest(
                'http://localhost:3000/subirImagen',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            );
    
            
    
            // Actualiza la lista de estudios
            const responseData = await sendRequest(
                'http://localhost:3000/imagenes',
                'GET',
                null,
                { Authorization: 'Bearer ' + auth.token }
            );
            setStudies(responseData.images);
    
            closeModalHandler();
            setNotificationMessage('Imagen subida correctamente.');
            setShowNotificationModal(true);
        } catch (err) {
            console.error('Error al subir la imagen:', err);
            setNotificationMessage('Hubo un error al subir la imagen.');
            setShowNotificationModal(true);
        }
    };

    return (
        <div>
            <Modal 
                show={showModal} 
                onCancel={closeModalHandler} 
                header="Sube una imagen para analizar"
                onSubmit={submitHandler}
                footer={
                    <>
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className={styles.modalContainer}>
                    <Button type="button" danger onClick={closeModalHandler}>Cancelar</Button>
                    <Button type="submit" disabled={!imagen}>Confirmar</Button>
                    </div>
                        
                    </>
                }
            >    
                <ImageUploader id="image" onInput={(id, file) => setImagen(file)} errorText="Por favor sube una imagen."/> 
            </Modal>
            <Modal
                show={showNotificationModal}
                onCancel={closeNotificationModal}
                header="Notificación"
                footer={
                    <Button onClick={closeNotificationModal}>Cerrar</Button>
                }
            >
                <p>{notificationMessage}</p>
            </Modal>
            <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
                <Button onClick={openModalHandler}>Sube un nuevo estudio</Button>
            </div>   
            <StudyList items={studies} onDeleteStudy={deleteStudyHandler}/>
        </div>
    );
};

export default Studies;
