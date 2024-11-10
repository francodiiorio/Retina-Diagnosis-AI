import React, { useState } from 'react';
import Button from "../FormElements/Button"

const ImgUploader = () => {
  const [image, setImage] = useState(null); // Guarda el archivo de imagen seleccionado
  const [preview, setPreview] = useState(null); // Guarda la URL de la imagen para previsualización

  // Maneja el cambio de archivo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // Acción para subir la imagen (simulada en este caso)
  const handleUpload = () => {
    if (image) {
      // Aquí iría la lógica para subir la imagen al servidor
      console.log("Imagen lista para subir:", image);
      alert("Imagen subida con éxito!");
    } else {
      alert("Por favor, selecciona una imagen primero.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", justifyContent: "center" }}>
      <h2>Subir Imagen</h2>
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <img src='/attach_file_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg' />        
      </label>
      <input type="file" accept="image/*" id="file-upload" onChange={handleImageChange} style={{ display: "none" }} />
      
      {/* Vista previa de la imagen */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <img src={preview} alt="Vista previa" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        </div>
      )}
      
      <Button onClick={handleUpload}>
        Subir Imagen
      </Button>
    </div>
  );
};

export default ImgUploader;
