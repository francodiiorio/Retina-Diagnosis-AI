import React, { useRef, useState, useEffect } from 'react'
import Button from '../Button'
import styles from "./ImageUploader.module.css"

function ImageUploader(props) {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid
        if (event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

  return (
    <div className='form-control'>
        <input 
            id={props.id} 
            ref={filePickerRef} 
            style={{display: "none"}} 
            type='file' 
            accept='.jpg,.png,jpeg'
            onChange={pickedHandler}
        />
        <div className={`${styles.imageUpload} ${props.center ? styles.center : ''}`}> 
            <div className={styles.imageUploadPreview}>
                {previewUrl && <img src={previewUrl} alt='preview'/>}
                {!previewUrl && <p>Escoja una imagen</p>}
            </div>
            <Button type="button" onClick={pickImageHandler}>Elige una Imagen</Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUploader