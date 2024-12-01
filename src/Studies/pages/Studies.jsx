import React, { useContext, useEffect, useState } from "react";
import StudyList from "../components/StudyList/StudyList";
import Modal from "../../Shared/components/UIElements/Modal/Modal";
import ImageUploader from "../../Shared/components/FormElements/ImageUploader/ImageUploader";
import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import {
  fetchStudies,
  deleteStudy,
  verificarRetina,
  subirImagen,
} from "../services/studiesServices";

import styles from "./studies.module.css";

const Studies = () => {
  const auth = useContext(AuthContext);
  const [studies, setStudies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagen, setImagen] = useState(null); // Estado para guardar la imagen
  const { sendRequest, isLoading } = useHttpClient();
  const [showNotificationModal, setShowNotificationModal] = useState(false); // Controla el modal de notificaciones
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const responseData = await fetchStudies(auth.token, sendRequest);
        setStudies(responseData.images);
      } catch (err) {
        console.error(err);
      }
    };
    loadStudies();
  }, [sendRequest, auth.token]);

  const openModalHandler = () => setShowModal(true);

  const closeModalHandler = () => {
    setShowModal(false);
    setImagen(null);
  };

  const deleteStudyHandler = async (fecha, horario) => {
    try {
      await deleteStudy(auth.token, sendRequest, fecha, horario);
      const responseData = await fetchStudies(auth.token, sendRequest);
      setStudies(responseData.images);
      setNotificationMessage("Estudio eliminado correctamente.");
      setShowNotificationModal(true);
    } catch (err) {
      setNotificationMessage("No se pudo eliminar el estudio. Intentá de nuevo.");
      setShowNotificationModal(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!imagen) {
      setNotificationMessage("Por favor selecciona una imagen.");
      closeModalHandler();
      setShowNotificationModal(true);
      return;
    }

    try {
      const retinaCheck = await verificarRetina(auth.token, sendRequest, imagen);
      if (!retinaCheck.result) {
        closeModalHandler();
        setNotificationMessage("Error, la imagen no es retina. Selecciona una válida.");
        setShowNotificationModal(true);
        return;
      }

      await subirImagen(auth.token, sendRequest, imagen);
      const responseData = await fetchStudies(auth.token, sendRequest);
      setStudies(responseData.images);

      closeModalHandler();
      setNotificationMessage("Imagen subida correctamente.");
      setShowNotificationModal(true);
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      setNotificationMessage("Hubo un error al subir la imagen.");
      setShowNotificationModal(true);
    }
  };

  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setNotificationMessage("");
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
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={styles.modalContainer}>
              <Button type="button" danger onClick={closeModalHandler}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!imagen}>
                Confirmar
              </Button>
            </div>
          </>
        }
      >
        <ImageUploader
          id="image"
          onInput={(id, file) => setImagen(file)}
          errorText="Por favor sube una imagen."
        />
      </Modal>
      <Modal
        show={showNotificationModal}
        onCancel={closeNotificationModal}
        header="Notificación"
        footer={<Button onClick={closeNotificationModal}>Cerrar</Button>}
      >
        <p>{notificationMessage}</p>
      </Modal>
      <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
        <Button onClick={openModalHandler}>Sube un nuevo estudio</Button>
      </div>
      <StudyList items={studies} onDeleteStudy={deleteStudyHandler} />
    </div>
  );
};

export default Studies;
