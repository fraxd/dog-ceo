import React, { useEffect, useState, useRef } from "react";
import { razasApi } from "../api/razasApi";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const SelecionarRaza = () => {
  // Se estableces todas las variables que se van a utilizar.
  const [razas, setRazas] = useState([]); // Almacena las razas de la API SIN ORDENAR NI ADAPTAR.
  const [razasOrdenadas, setRazasOrdenadas] = useState([]); // Almacena las razas de la API ORDENADAS Y ADAPTADAS para el MultiSelect.
  const [filterValue, setFilterValue] = useState(""); // Almacena el valor del filtro.
  const filterInputRef = useRef(); // Referencia al input del filtro.

  useEffect(() => {
    getRazas();
  }, []);
  const getRazas = async () => {
    const resp = await razasApi
      .get("/breeds/list/all")
      .then((resp) => {
        setRazas(Object.entries(resp.data.message));
        console.log(resp.data.message)
      })
      .then(() => {
        ordernarRazas();
      });
  };

  const ordernarRazas = () => {
    razas.map((raza) => {
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
            value: subraza,
          });
        });
      }
      setRazasOrdenadas((razasOrdenadas) => [...razasOrdenadas, resultado]);
    });
  };

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
  const myResetFunction = (options) => {
    setFilterValue("");
    options.reset();
    filterInputRef && filterInputRef.current.focus();
  };

  const myFilterFunction = (event, options) => {
    let _filterValue = event.target.value;
    setFilterValue(_filterValue);
    options.filter(event);
  };

  const [selectRazas, setSelectRazas] = React.useState(null);
  return (
    <div className="mt-5">
      {
        <MultiSelect
          value={selectRazas}
          options={razasOrdenadas}
          onChange={(e) => setSelectRazas(e.value)}
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
