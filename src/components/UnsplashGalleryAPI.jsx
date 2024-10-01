import { useState, useEffect } from "react";

export const UnsplashGalleryAPI = () => {
  // Estado para guardar los datos de la API y manejar el estado de carga
  const [images, setimages] = useState([]);

  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API

  const fetchImagesGallery = async () => {
    try {
      const response = await fetch("https://api.unsplash.com/photos/?client_id=xB7AQWkP5weXMpnpxEBB0blEvbhVfhTNFXGG9agKXeA"); 

      const data = await response.json();
      console.log(data);

      setimages(data); // Guardamos los datos en el estado
    } catch (error) {
      console.log("Error al realizar la solicitud", error); // Debugg
      setError("Error al realizar la solicitud");
    }
  };

  // useEffect ejecuta el método fetchData la primera vez que se monta el componente ( hace petición de la API)
  useEffect(() => {
    fetchImagesGallery();
  }, []);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">
        Galería de Imagenes Publicas con Fetch
      </h2>

      {/* Agregamos un contenedor scroll y altura fija */}
      <div
        className="row overflow-auto vh-80"
        style={{ maxHeight: "80vh", overflowY: "scroll" }}
      >
        {images.map((image, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={image.urls.full}
                className="fixed-img"
                alt="Image"
              />
              <div className="card-body">
                <h5 className="card-title">Imagen {index + 1}</h5>
                <h5>Creada: {image.created_at}</h5>
                <h5 className="card-text">Descripcion:   
                {image.alt_description}
                </h5>
                <h5>URL: <a href={image.urls.full}> Descargar </a></h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};