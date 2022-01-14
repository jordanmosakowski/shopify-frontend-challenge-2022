import apiCall from './api';
import React, {useState, useEffect} from "react";
import {
  Link,
} from "react-router-dom";
import "./home.css";

export default function Home(){
    const [rovers, setRovers] = useState([]);

    useEffect( () => {
        async function fetchRovers(){
          setRovers((await apiCall('/rovers')).rovers);
        }
        fetchRovers();
    },[]);

    return (<main>
        <h2>Select a Mission to Begin:</h2>
        {
            rovers.map(rover => <div className='card' key={"rover_"+rover.id}>
                <Link to={"/rover/"+rover.name.toLowerCase()}>
                    <span style={{fontSize: "2em"}}>{rover.name}</span>
                    <span>{rover.total_photos} Total Photos</span>
                    <span>Status: {rover.status}</span>
                </Link>
            </div>)
        }
    </main>);
}