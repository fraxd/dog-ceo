import React from "react";
import { SelecionarRaza } from "../Components/select-Raza";
import { DogsPhotos} from '../Components/dogs-photos'

export const ListadoPerros = () => {

  const [selectRazas, setSelectRazas] = React.useState(null); // Array de razas seleccionadas;
  // Al no existir ninguna raza selecionada, se retornan todas las fotos de perros.
  return (
    <div>
      <h1>Dog-Ceo</h1>
      <b>Desarrollado por Franco Fuentes S.</b> <br />
      <b>Franco.fuentes.s@mail.pucv.cl</b> <br />
      <a href="https://github.com/fraxd">Perfil Github</a>
      <p>Herramienta que entrega imaganes de perro permitiendo poder delimitarla por raza. Utiliza la informacion otorgada por https://dog.ceo/</p>
      <SelecionarRaza selectRazas={selectRazas} setSelectRazas={setSelectRazas} />
      <hr />
      <DogsPhotos selectRazas={selectRazas} setSelectRazas={setSelectRazas} />
      <hr />
      Febrero, 2023.
    </div>
  );
};
