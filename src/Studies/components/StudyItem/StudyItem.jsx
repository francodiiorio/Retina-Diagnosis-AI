import React, {useState} from "react";
import { Link } from 'react-router-dom';

import styles from './StudyItem.module.css'; 
import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card"; 
import Modal from "../../../Shared/components/UIElements/Modal/Modal";

const StudyItem = props => {
    const [showModal, setShowModal] = useState(false)

    const openModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);
    return (
        <React.Fragment>
            <Modal show={showModal} onCancel={closeModalHandler} header={props.name}>
                <div className={styles.modalContainer}>
                    <h2>Informacion del Estudio</h2>
                    <img src={props.image} alt="Vista previa" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                </div>
            </Modal>
        <li className={styles.studyItem} onClick={openModalHandler}>
            <Card className={styles.studyItemContent}>
                <Link to={``}>
                    <div className={styles.studyItemImg}>
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className={styles.studyItemInfo}>
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'place' : 'places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
        </React.Fragment>
    )
};

export default StudyItem;