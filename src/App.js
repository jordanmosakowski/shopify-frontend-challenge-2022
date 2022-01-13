import apiCall from './api';
import React, {useState, useEffect} from "react";

function App() {
  const [pictures, setPictures] = useState([]);

  useEffect( async () => {
    async function fetchPhotos(){
      const photos = await apiCall('/rovers/curiosity/photos', {sol: 1000});
      setPictures(photos.photos);
      console.log(photos.photos);
    }
    fetchPhotos();
  },[]);

  return (
    <div className="App">
      {
        pictures.map(picture => <div key={picture.id}>
          <img src={picture.img_src} alt=""/>
          <span>{picture.camera.full_name}</span>
        </div>)
      }
    </div>
  );
}

export default App;
