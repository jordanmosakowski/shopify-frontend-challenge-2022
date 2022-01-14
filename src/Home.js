import apiCall from './api';
import React, {useState, useEffect} from "react";
import {
  Link,
} from "react-router-dom";
import "./home.css";

export default function Home(){
    const [rovers, setRovers] = useState([]);

    //Display a list of rovers to view photos from
    useEffect( () => {
        async function fetchRovers(){
          setRovers((await apiCall('/rovers')).rovers);
        }
        fetchRovers();
    },[]);

    return (<main>
        <h2>Select a Mission to Begin:</h2>
        {
            rovers.map(rover => <article className='card' key={"rover_"+rover.id}>
                <Link to={"/rover/"+rover.name.toLowerCase()}>
                    <h4 style={{fontSize: "2em"}}>{rover.name}</h4>
                    <span>{rover.total_photos} Total Photos</span>
                    <span>Mission Status: {rover.status}</span>
                </Link>
            </article>)
        }
    </main>);
}