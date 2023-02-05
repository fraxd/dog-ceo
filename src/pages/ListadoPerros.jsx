import React from "react";
import { SelecionarRaza } from "../Components/select-Raza";
import { DogsPhotos} from '../Components/dogs-photos'

export const ListadoPerros = () => {
  return (
    <div className="mt-12">
      <h1>Razas de Perros</h1>
      <SelecionarRaza />
      <hr />
      <DogsPhotos/>
    </div>
  );
};
