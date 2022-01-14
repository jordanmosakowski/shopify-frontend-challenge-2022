import React, {useState} from "react";
import "./picture.css";

export function Picture(props){
    const {picture} = props;
    const [liked, setLiked] = useState(localStorage.getItem(`liked_${picture.rover.name.toLowerCase()}_${picture.id}`) == "true");
    const toggleLike = ()=>{
        if(liked){
            localStorage.removeItem(`liked_${picture.rover.name.toLowerCase()}_${picture.id}`);
        }
        else{
            localStorage.setItem(`liked_${picture.rover.name.toLowerCase()}_${picture.id}`,"true");
        }
        setLiked(!liked);
        let button = document.getElementById('button_'+picture.id);
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"),500);
    }
    return (
        <article className="picture" >
            <img src={picture.img_src} alt=""/><br/>
            <span className="title">{picture.camera.full_name}</span>
            <span className="description">{picture.rover.name} | {picture.earth_date}</span><br/>
            <button id={'button_'+picture.id} onClick={toggleLike}>{liked ? "❤️" : "🤍"}</button>
        </article>
    )
}