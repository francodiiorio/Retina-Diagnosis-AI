import React, { useContext } from "react";
import Dropdown from "../../../Shared/components/UIElements/DropDown/DropDown";
import strings from "../../services/userSevice";
import { AuthContext } from "../../../Shared/context/auth-context";
import Button from "../../../Shared/components/FormElements/Button";
import Modal from "../../../Shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../../Shared/hooks/http-hook";

import styles from "./Config.module.css";

function Config() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const deleteAccountHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:3000/users/delete/${auth.userId}`, // Cambiá la URL según tu backend
        "DELETE",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );

      // Después de eliminar la cuenta, cerramos la sesión
      auth.logout();
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert("No se pudo eliminar la cuenta. Por favor, intentá de nuevo.");
    }
  };

  const showDeleteConfirmation = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>Información sobre Brisa</h2>
      <Dropdown
        title={strings.privacidad}
        content={[
          strings.privacidadBody,
          "\n\n",
          strings.privacidadBody1,
          "\n\n",
          strings.privacidadBody2,
          "\n\n",
          strings.privacidadBody3,
          "\n\n",
          strings.privacidadBody4,
          "\n\n",
          strings.privacidadBody5,
        ]}
      />
      <Dropdown
        title={strings.terminos}
        content={[
          strings.terminosBody,
          "\n\n",
          strings.terminosBody1,
          "\n\n",
          strings.terminosBody2,
          "\n\n",
          strings.terminosBody3,
          "\n\n",
          strings.terminosBody4,
          "\n\n",
          strings.terminosBody5,
        ]}
      />
      <Dropdown
        title={strings.version}
        content={[
          strings.versionBody,
          "\n\n",
          strings.versionBody1,
          "\n\n",
          strings.versionBody2,
        ]}
      />
      <Dropdown
        title={strings.preguntas}
        content={[
          strings.preg1titulo,
          "\n\n",
          strings.preg1body,
          "\n\n\n",
          strings.preg2titulo,
          "\n\n",
          strings.preg2body,
          "\n\n\n",
          strings.preg3titulo,
          "\n\n",
          strings.preg3body,
          "\n\n\n",
          strings.preg4titulo,
          "\n\n",
          strings.preg4body,
          "\n\n\n",
        ]}
      />
      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={auth.logout}>
          Logout
        </Button>
        <br></br>
        <Button danger onClick={showDeleteConfirmation}>
          Borrar cuenta
        </Button>
      </div>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Confirmar eliminación"
        footer={
          <>
            <div className={styles.modalContainer}>
              <Button danger onClick={deleteAccountHandler}>
                Confirmar
              </Button>
              <Button onClick={cancelDeleteHandler}>Cancelar</Button>
            </div>
          </>
        }
      >
        <p>
          ¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se
          puede deshacer.
        </p>
      </Modal>
    </div>
  );
}

export default Config;
