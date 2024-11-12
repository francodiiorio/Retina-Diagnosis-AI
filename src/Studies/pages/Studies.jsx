import React, { useEffect, useState } from "react";
import StudyList from "../components/StudyList/StudyList";
import ImgUploader from "../../Shared/components/ImgUploader/ImgUploader";
import Modal from "../../Shared/components/UIElements/Modal/Modal";
import ImageUploader from "../../Shared/components/FormElements/ImageUploader/ImageUploader";
import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import studiesServices from "../services/userSevice";

const Studies = () => {
    const [studies, setStudies] = useState([])
    const [showModal, setShowModal] = useState(false)

    const [formState, inputHandler] = useForm({
        image: {
            value: null,
            isValid: false
        }
      }, false)

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
    const submitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
      };
    return (
        <div>
            <Modal 
                show={showModal} 
                onCancel={closeModalHandler} 
                header="Sube una imagen para analizar"
                onSubmit={submitHandler}
                footer={
                    <React.Fragment>
                    <Button danger onClick={closeModalHandler}>Cancel</Button>
                    <Button type="submit" disabled={!formState.isValid}>Submit</Button>
                </React.Fragment>
                }
            >    
                <ImageUploader id="image" onInput={inputHandler} errorText="Please provide an image."/> 
            </Modal>
            <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
                <Button  onClick={openModalHandler}>Sube un nuevo estudio</Button>
            </div>   
            <StudyList items={studies}/>
    
        </div>
    )
}

export default Studies