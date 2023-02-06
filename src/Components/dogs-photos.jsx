import React, { useState, useEffect } from "react";
import {
  getPhotosService,
  getPhotosRazaService,
} from "../service/getPhotosService";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import "../css/dogs-photos.css";

export const DogsPhotos = ({ selectRazas }) => {
  const [photosDogs, setPhotosDogs] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    getPhotos();
  }, [selectRazas]);

  //Esta funciona obtiene las fotos de los perros.
  const getPhotos = () => {
    if (selectRazas != null && selectRazas.length > 0) {
      console.log("ke paza");
      setLoadData(false);
      setPhotosDogs([]);
      let contador = 20;
      if (selectRazas.length > 20) contador = selectRazas.length;
      // La idea de este for es ir solicitando photos de perros hasta obtener por lo menos 20 fotos.
      let i = 0;
      do {
        selectRazas.map((raza) => {
          i++;
          getPhotosRazaService((raza = { raza })).then((data) => {
            setPhotosDogs((photosDogs) => [...photosDogs, data]);
          });
        });
      } while (i < contador);
      setLoadData(true);
      console.log(photosDogs);
    } else {
      setLoadData(false);
      getPhotosService().then((data) => {
        setPhotosDogs(data);
        setLoadData(true);
      });
    }
  };

  if (!loadData) {
    return (
      <div>
        <ProgressSpinner />
        <p>Loading Data...</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="gallery">
          {photosDogs.map((photo, index) => {
            return (
              <div key={index} className="pics">
                <Image src={photo} alt="Image" width="330" preview />
              </div>
            );
          })}
        </div>
        <br />
        <Button
          label="¿Nuevas Fotos?"
          className="p-button-rounded p-button-secondary boton"
          onClick={() => {
            getPhotos();
          }}
        />
      </>
    );
  }
};
