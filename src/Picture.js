import React, {useState} from "react";

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
    }
    return (
        <div>
                <img src={picture.img_src} alt=""/><br/>
                <span>{picture.camera.full_name}</span>
                <button onClick={toggleLike}>{liked ? "Unlike" : "Like"}</button>
        </div>
    )
}