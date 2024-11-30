export const fetchStudies = async (token, sendRequest) => {
    return await sendRequest('http://localhost:3000/imagenes', 'GET', null, {
      Authorization: 'Bearer ' + token,
    });
  };
  
  export const deleteStudy = async (token, sendRequest, fecha, horario) => {
    return await sendRequest(
      `http://localhost:3000/users/deleteResult/${fecha}/${horario}`,
      'DELETE',
      null,
      {
        Authorization: 'Bearer ' + token,
      }
    );
  };
  
  export const verificarRetina = async (token, sendRequest, image) => {
    const formData = new FormData();
    formData.append('file', image);
  
    return await sendRequest('http://localhost:3000/isRetina', 'POST', formData, {
      Authorization: 'Bearer ' + token,
    });
  };
  
  export const subirImagen = async (token, sendRequest, image) => {
    const formData = new FormData();
    formData.append('file', image);
  
    return await sendRequest('http://localhost:3000/subirImagen', 'POST', formData, {
      Authorization: 'Bearer ' + token,
    });
  };
  