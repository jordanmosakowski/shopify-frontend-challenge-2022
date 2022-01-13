import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
export default function Rover(){
    const [pictures, setPictures] = useState([]);
    const { roverId } = useParams();

    useEffect( () => {
        async function fetchPhotos(){
            const photos = await apiCall(`/rovers/${roverId}/photos`, {sol: 0, page:1});
            setPictures(photos.photos);
            console.log(photos.photos);
        }
        fetchPhotos();
    },[]);
    return <div>
        {
            pictures.map(picture => <div key={picture.id}>
                <img src={picture.img_src} alt=""/>
                <span>{picture.camera.full_name}</span>
            </div>)
        }
    </div>
}