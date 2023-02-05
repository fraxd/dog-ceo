import React from "react";
import {razasApi} from '../api/razasApi'

export const getPhotosService = async () =>{

    const resp = await razasApi.get('/breeds/image/random/10');
    return resp.data.message;
}