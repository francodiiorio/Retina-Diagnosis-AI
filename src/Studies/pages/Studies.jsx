import React, { useEffect, useState } from "react";
import StudyList from "../components/StudyList/StudyList";
import ImgUploader from "../../Shared/components/ImgUploader/ImgUploader";
import Modal from "../../Shared/components/UIElements/Modal/Modal";
import ImageUploader from "../../Shared/components/FormElements/ImageUploader/ImageUploader";
import Button from "../../Shared/components/FormElements/Button";

import studiesServices from "../services/userSevice";

const Studies = () => {
    const [studies, setStudies] = useState([])
    const [showModal, setShowModal] = useState(false)

    const openModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);

    useEffect(() => {
        studiesServices.getStudies().then( studies => {
            setStudies(studies)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <Modal show={showModal} onCancel={closeModalHandler} header="Sube una imagen para analizar">
                <ImageUploader id="image"/>
            </Modal>
            <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
                <Button  onClick={openModalHandler}>Sube un nuevo estudio</Button>
            </div>   
            <StudyList items={studies}/>
    
        </div>
    )
}

export default Studies