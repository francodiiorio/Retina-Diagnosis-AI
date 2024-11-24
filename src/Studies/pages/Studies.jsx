import React, { useContext, useEffect, useState } from "react";
import StudyList from "../components/StudyList/StudyList";
import Modal from "../../Shared/components/UIElements/Modal/Modal";
import ImageUploader from "../../Shared/components/FormElements/ImageUploader/ImageUploader";
import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttpClient } from "../../Shared/hooks/http-hook";

const Studies = () => {
    const auth = useContext(AuthContext);
    const [studies, setStudies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [imagen, setImagen] = useState(null); // Estado para guardar la imagen
    const { sendRequest } = useHttpClient();

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
    const closeModalHandler = () => setShowModal(false);

    const verificarRetina = async (image) => {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch(`http://localhost:3000/isRetina`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseVerificar = await response.json();
            return responseVerificar.result;
        } catch (error) {
            console.error('Error al verificar la imagen:', error);
            return false;
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!imagen) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        const esRetina = await verificarRetina(imagen);
        if (!esRetina) {
            alert('La imagen no es retina. Por favor, selecciona una imagen válida.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imagen);

        try {
            const response = await fetch(`http://localhost:3000/subirImagen`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Hubo un error al subir la imagen');
            }

            alert('Imagen subida correctamente');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Hubo un error al subir la imagen');
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
                        <Button danger onClick={closeModalHandler}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </>
                }
            >    
                <ImageUploader id="image" onInput={(id, file) => setImagen(file)} errorText="Please provide an image."/> 
            </Modal>
            <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
                <Button onClick={openModalHandler}>Sube un nuevo estudio</Button>
            </div>   
            <StudyList items={studies}/>
        </div>
    );
};

export default Studies;
