import React from "react";
import {razasApi} from '../api/razasApi'

export const getPhotosService = async () =>{

    const resp = await razasApi.get('/breeds/image/random/20');
    return resp.data.message;
}

export const getPhotosRazaService  = async ({raza}) =>{
    let temp = raza.split('+');
    if(temp[1]) var resp = await razasApi.get(`/breed/${temp[0]}/${temp[1]}/images/random/1`);
    else var resp = await razasApi.get(`/breed/${temp[0]}/images/random/1`);  
    return resp.data.message;



}