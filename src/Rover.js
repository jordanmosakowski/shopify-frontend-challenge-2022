import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
import { Picture } from "./Picture";
import "./rover.css";

export default function Rover(){
    const [pictures, setPictures] = useState(null);
    const { roverId } = useParams();
    const [selectedDate, setDate] = useState("2022-01-01")

    useEffect( () => {
        fetchPhotos(selectedDate);
    },[]);

    const fetchPhotos = async (date) =>{
        const photos = await apiCall(`/rovers/${roverId}/photos`, {earth_date: date, page: 1});
        setPictures(photos.photos);
    }

    const dateChanged = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        fetchPhotos(newDate);
    }


    return <div>
        <div class='date-selection'>
            <h2>View photos for:</h2>
            <input type="date" min="2004-01-01" max={(new Date()).toISOString().split("T")[0]} value={selectedDate}  onChange={dateChanged}/>    
        </div>
        <main style={{textAlign:"center"}}>
            {
                pictures == null ? <h2>Loading Photos...</h2> : 
                (pictures.length==0 ? <h2>No photos found for selected date</h2> : pictures.map(picture => <Picture picture={picture} key={picture.id}/>))
            }
        </main>
    </div>
}