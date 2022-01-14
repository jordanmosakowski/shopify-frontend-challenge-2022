import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
import { Picture } from "./Picture";
import "./rover.css";

export default function Rover(){
    const [pictures, setPictures] = useState(null);
    const { roverId } = useParams();
    const [selectedDate, setDate] = useState((roverId == "spirit" || roverId == "opportunity" ) ? "2010-01-01" : "2022-01-01");
    const [page, setPage] = useState(1);
    const [minDate,setMinDate] = useState("2004-01-01");
    const [maxDate,setMaxDate] = useState((new Date()).toISOString().split("T")[0]);

    //Fetch photos on load
    useEffect(() => {
        fetchPhotos(selectedDate);
        loadRoverInfo();
    },[]);

    //Load the rover info to set minDate and maxDate
    const loadRoverInfo = async () => {
        const roverInfo = (await apiCall(`/rovers/${roverId}`)).rover;
        setMinDate(roverInfo.landing_date);
        setMaxDate(roverInfo.max_date);
    }

    //Fetch the first set of photos for a given date
    const fetchPhotos = async (date) =>{
        const photos = await apiCall(`/rovers/${roverId}/photos`, {earth_date: date, page: 1});
        setPictures(photos.photos);
    }

    //Fetch the first set of photos for a given date
    const paginatePhotos = async () =>{
        const photos = await apiCall(`/rovers/${roverId}/photos`, {earth_date: selectedDate, page: page+1});
        if(photos.photos.length==0){
            setPage(null);
            return;
        }
        pictures.push(...photos.photos);
        setPage(page+1);
    }

    //Triggered when the date input field is changed
    //Fetches new photos with the new date
    const dateChanged = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        setPage(1);
        fetchPhotos(newDate);
    }


    return <>
        <div class='date-container'>
            <label for='date-selector'>View photos for:</label>
            <input type="date" name='date-selector' id='date-selector' min={minDate} max={maxDate} value={selectedDate}  onChange={dateChanged}/>    
        </div>
        <main style={{textAlign:"center"}}>
            {
                pictures == null ? <h2>Loading Photos...</h2> : 
                (pictures.length==0 ? <h2>No photos found for selected date</h2> : pictures.map(picture => <Picture picture={picture} key={picture.id}/>))
            }
        </main>
        {
            page!=null && pictures!=null && pictures.length>0 && <button data-message="Load More Photos" className='paginate' onClick={paginatePhotos}>Load More</button>
        }
    </>
}