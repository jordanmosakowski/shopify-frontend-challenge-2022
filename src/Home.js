import apiCall from './api';
import React, {useState, useEffect} from "react";
import {
  Link,
} from "react-router-dom";

export default function Home(){
    const [rovers, setRovers] = useState([]);

    useEffect( () => {
        async function fetchRovers(){
          setRovers((await apiCall('/rovers')).rovers);
        }
        fetchRovers();
    },[]);
    
    const linkStyle = {
        color: "black",
        textDecoration: "none",
        textAlign: "center",
    };
    const linkHolderStyle = {
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        display: "inline-block",
        borderRadius: "10px"
    }

    return (<div>
        {
            rovers.map(rover => <div style={linkHolderStyle}>
                <Link style={linkStyle} to={"/rover/"+rover.name.toLowerCase()} key={"rover_"+rover.id}>
                    <span style={{fontSize: "2em"}}>{rover.name}</span><br/>
                    <span>{rover.total_photos} Total Photos</span><br/><br/>
                </Link>
            </div>)
        }
    </div>);
}