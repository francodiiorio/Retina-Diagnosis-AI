import React, {useState} from "react";
import { Link } from 'react-router-dom';

import styles from './StudyItem.module.css'; 
import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card"; 
import Modal from "../../../Shared/components/UIElements/Modal/Modal";
import Button from "../../../Shared/components/FormElements/Button";

const StudyItem = props => {
    const [showModal, setShowModal] = useState(false)
    
    const correctedPath = props.image.replace(/\\/g, '/');
    const openModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);

    const deleteHandler = (event) => {
        event.stopPropagation();
        props.onDelete(props.fecha, props.horario); 
    };

    return (
        <React.Fragment>
            <Modal show={showModal} onCancel={closeModalHandler} header="Estudio">
                <div className={styles.modalContainer}>
                    <h2 className={styles.title}>Informacion del Estudio</h2>                  
                    <div className={styles.modalInfoContainer}>
                        <img src={`http://localhost:3000/${correctedPath}`} alt="Vista previa" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                        <div>
                            <p>Fecha: {props.fecha}</p>
                            <p>Hora: {props.horario}</p>
                            <h3>{props.analysis[0]}</h3>
                            {props.analysis[1] != "NO_DR" && <h3>{props.analysis[1]}</h3>}
                            
                            <Button type="button" onClick={deleteHandler} danger>Borrar</Button>
                        </div>                       
                    </div>
                </div>
            </Modal>
        <li className={styles.studyItem} onClick={openModalHandler}>
            <Card className={styles.studyItemContent}>
                <Link to={``}>
                    <div className={styles.studyItemImg}>
                        <Avatar image={`http://localhost:3000/${correctedPath}` } alt="imagen del estudio" />
                    </div>
                    <div className={styles.studyItemInfo}>
                        <h2>{props.fecha}</h2>
                        <h3>{props.horario}</h3>
                    </div>
                </Link>
                
            </Card>
        </li>
        </React.Fragment>
    )
};

export default StudyItem;