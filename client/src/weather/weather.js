import React, {useEffect, useState} from "react";

const fetchWeatherData = async () => {
    return fetch(`/api/weather?token=kissa`, {
        method : 'get',
        headers : {}
    })
    .then ( res => res.json())
    .catch(err => {
        console.log(err);
        return [];
    })
};

const Weather = () => {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await fetchWeatherData();
            setWeather(data);
        })();
    }, []);

    return (
        <div className="">
            {weather.length > 0 ? weather.map( (item) => (
                <div>
                    <p>{item.properties.name}</p>
                    {item.properties.presets.map( (camera) => (
                        <img src={camera.imageUrl}></img>
                    ) )}
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

export default Weather;