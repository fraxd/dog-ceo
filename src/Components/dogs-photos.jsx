import React, { useState, useRef, useEffect } from "react";
import { getPhotosService } from "../service/getPhotosService";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

export const DogsPhotos = () => {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);

  const rows = useRef(6);
  const datasource = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true; 
        getPhotosService().then((data) => {
            datasource.current = data;
            setTotalRecords(data.length);
            setProducts(datasource.current.slice(0, rows.current));
            setLoading(false);
        })
    }, 1000);
  }, []); //
  const onPage = (event) => {
    setLoading(true);
    //imitate delay of a backend call
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
      const newProducts =
        startIndex === endIndex
          ? datasource.current.slice(startIndex)
          : datasource.current.slice(startIndex, endIndex);
      setFirst(startIndex);
      setProducts(newProducts);
      setLoading(false);
    }, 1000);
  };
  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="flex flex-column align-items-center p-3 w-full md:flex-row">
          <img
            className="md:w-11rem w-9 shadow-2 md:my-0 md:mr-5 mr-0 my-5"
            src={`${data}`}
            alt={data.name}
          />
          <div className="text-center md:text-left md:flex-1">
            <div className="text-2xl font-bold">{data.name}</div>
          </div>
        </div>
      </div>
    );
  };
  const renderGridItem = (data) => {
    let nombreRaza = data.split("/");
    return (
      <div className="col-12 md:col-4">
        <div className="m-2 border-1 surface-border card">
          <div className="text-center">
            <img
              className="w-9 my-5 shadow-3"
              src={`${data}`}
              alt={nombreRaza[4]}
            />
            <div className="text-2xl font-bold"><b>{nombreRaza[4]}</b></div>
          </div>
        </div>
      </div>
    );
  };
  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }
    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };
  const renderHeader = () => {
    let onOptionChange = (e) => {
      setLoading(true);
      setLayout(e.value);
    };
    return (
      <div style={{ textAlign: "left" }}>
        <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="card dataview-demo">
      <DataView
        value={products}
        layout={layout}
        itemTemplate={itemTemplate}
        paginator
        rows={9}
        sortOrder={sortOrder}
        sortField={sortField}
      />
    </div>
  );
};
