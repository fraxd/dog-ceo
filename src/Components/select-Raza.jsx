import React, { useEffect, useState, useRef } from "react";
import { razasApi } from "../api/razasApi";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { GetRazasServices } from "../service/getRazasService";

export const SelecionarRaza = ({ selectRazas, setSelectRazas }) => {
  // Se estableces todas las variables que se van a utilizar.
  const [razasOrdenadas, setRazasOrdenadas] = useState([]); // Almacena las razas de la API ORDENADAS Y ADAPTADAS para el MultiSelect.
  const [filterValue, setFilterValue] = useState(""); // Almacena el valor del filtro.
  const filterInputRef = useRef(); // Referencia al input del filtro.
  useEffect(() => {
    GetRazasServices().then((resp) => {
      ordernarRazas(resp);
    });
  }, []);

  // Funcion que ordena las razas de la API para que sean compatibles con el MultiSelect.
  const ordernarRazas = (resp) => {
    resp.map((raza) => {
      let resultado = {
        label: raza[0],
        code: raza[0],
        items: [
          {
            label: raza[0],
            value: raza[0],
          },
        ],
      };
      if (raza[1].length > 0) {
        raza[1].map((subraza) => {
          resultado.items.push({
            label: subraza,
            value: `${raza[0]}+${subraza}`,
          });
        });
      }
      setRazasOrdenadas((razasOrdenadas) => [...razasOrdenadas, resultado]);
    });
  };

  // Funcion que retorna el template del filtro.
  const filterTemplate = (options) => {
    let { filterOptions } = options;

    return (
      <div className="flex gap-2">
        <InputText
          value={filterValue}
          ref={filterInputRef}
          onChange={(e) => myFilterFunction(e, filterOptions)}
          className="p-inputtext-sm block mb-2"
        />
      </div>
    );
  };
  //Funcion que filtra las razas.
  const myFilterFunction = (event, options) => {
    let _filterValue = event.target.value;
    setFilterValue(_filterValue);
    options.filter(event);
  };

  // const [selectRazas, setSelectRazas] = React.useState(null);

  return (
    <div className="mt-12">
      {
        <MultiSelect
          value={selectRazas}
          options={razasOrdenadas}
          onChange={(e) => {
            setSelectRazas(e.value);
            console.log(selectRazas);
          }}
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Seleciona Raza"
          filter
          filterTemplate={filterTemplate}
          maxSelectedLabels={3}
        />
      }
    </div>
  );
};
