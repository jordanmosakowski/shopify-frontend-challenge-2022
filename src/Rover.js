import React, {useState, useEffect} from "react";
import apiCall from './api';
import {useParams} from "react-router-dom";
import { Picture } from "./Picture";
import "./rover.css";

export default function Rover(){
    const [pictures, setPictures] = useState(null);
    const { roverId } = useParams();
    const [selectedDate, setDate] = useState("2022-01-01");
    const [page, setPage] = useState(1);

    //Fetch photos on load
    useEffect(() => {
        fetchPhotos(selectedDate);
    },[]);

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


    return <div>
        <div className='date-selection'>
            <h2>View photos for:</h2>
            <input type="date" min="2004-01-01" max={(new Date()).toISOString().split("T")[0]} value={selectedDate}  onChange={dateChanged}/>    
        </div>
        <main style={{textAlign:"center"}}>
            {
                pictures == null ? <h2>Loading Photos...</h2> : 
                (pictures.length==0 ? <h2>No photos found for selected date</h2> : pictures.map(picture => <Picture picture={picture} key={picture.id}/>))
            }
        </main>
        {
            page!=null && pictures!=null && pictures.length>0 && <button className='paginate' onClick={paginatePhotos}>Load More</button>
        }
    </div>
}