import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
import { Picture } from "./Picture";
export default function Rover(){
    const [pictures, setPictures] = useState([]);
    const { roverId } = useParams();

    useEffect( () => {
        async function fetchPhotos(){
            const photos = await apiCall(`/rovers/${roverId}/photos`, {sol: 0, page:1});
            setPictures(photos.photos);
        }
        fetchPhotos();
    },[]);
    return <div>
        {
            pictures.map(picture => <Picture picture={picture} key={picture.id}/>)
        }
    </div>
}