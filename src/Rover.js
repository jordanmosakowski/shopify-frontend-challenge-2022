import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
import { Picture } from "./Picture";
export default function Rover(){
    const [pictures, setPictures] = useState([]);
    const { roverId } = useParams();
    const [selectedDate, setDate] = useState("2022-01-01")

    useEffect( () => {
        fetchPhotos(selectedDate);
    },[]);

    const fetchPhotos = async (date) =>{
        const photos = await apiCall(`/rovers/${roverId}/photos`, {earth_date: date, page:1});
        setPictures(photos.photos);
    }

    const dateChanged = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        fetchPhotos(newDate);
    }


    return <div>

    <input type="date" min="2004-01-01" max={(new Date()).toISOString().split("T")[0]} value={selectedDate}  onChange={dateChanged}/>
        {
            pictures.map(picture => <Picture picture={picture} key={picture.id}/>)
        }
    </div>
}