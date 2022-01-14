import React, {useState} from "react";
import "./picture.css";

export function Picture(props){
    const {picture} = props;
    const [liked, setLiked] = useState(localStorage.getItem(`liked_${picture.rover.name.toLowerCase()}_${picture.id}`) == "true");
    
    //Toggle whether a picture has been "like"
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

    //Popup to view larger version of photos
    const openPopup = ()=>{
        document.getElementById("popup_"+picture.id).classList.add("open");
    }
    const closePopup = ()=>{
        document.getElementById("popup_"+picture.id).classList.remove("open");
    }

    return (
        <article className="picture" >
            <img onClick={openPopup} src={picture.img_src} /><br/>
            <span className="title">{picture.camera.full_name}</span>
            <span className="description">{picture.rover.name} | {picture.earth_date}</span><br/>
            <button id={'button_'+picture.id} onClick={toggleLike}>{liked ? "❤️" : "🤍"}</button>
            <div id={'popup_'+picture.id} className='popup' onClick={closePopup}>
                <img src={picture.img_src}></img>
            </div>
        </article>
    )
}