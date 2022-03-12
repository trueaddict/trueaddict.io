import React, {useEffect, useState} from "react";
import './photos.css';

const fetchPhotos = async () => {
    return fetch(`/api/files/public?token=kissa`, {
        method: 'GET',
        headers: {},
    })
    .then( res => res.json())
    .catch(err => {
        console.log(err);
        return [];
    })
};

const Photos = () => {
    const [photosList, setPhotosList] = useState([]);


    useEffect(() => {
        (async () => {
            const data = await fetchPhotos();
            console.log(data.slice(1));
            setPhotosList(data.slice(1));
        })();
    }, []);

    return (
        <div className="container">
            <div className="header"></div>
            {photosList.length > 0 ? photosList.map( (photo) => (
                <div key={photo.id} className="gallery">
                    <div className="waves-effect waves-light">
                        <img className="responsive-img" src={`/api/file/${photo.id}?token=kissa`} alt={photo.id} height={500}></img>
                    </div>
                </div>
            ) ) : (
                <div className="center">
                    <div class="preloader-wrapper active">
                        <div class="spinner-layer spinner">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Photos;