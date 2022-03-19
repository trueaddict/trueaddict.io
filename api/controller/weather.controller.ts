import * as geoip from 'geoip-lite'; 
import axios from 'axios';

const getWeatherCameras = async (req : any, res : any) : Promise<any> => {
    let ip = '83.245.136.202'; //req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);

    let geo = geoip.lookup(ip);

    console.log(geo);

    let center = {
        X: geo.ll[0],
        Y: geo.ll[1]
    }

    let allCameras = await fetchCameraStations();
    let filteredCameras = [];
    for (let camera of allCameras) {
        let point = {
            X: camera.geometry.coordinates[1], 
            Y: camera.geometry.coordinates[0]
        }
        if (isDistanceAllowed(center, point, 0.2)) {
            let camDetails = Object.assign({}, camera);
            if (camDetails.properties.nearestWeatherStationId) {
                camDetails.weather = await fetchWeatherData(String(camDetails.properties.nearestWeatherStationId));
            }

            filteredCameras.push(camDetails);
        }    
    }

    
    res.json( filteredCameras );
}

interface Coordinate {
    X : number;
    Y : number;
}

const isDistanceAllowed = (value1 : Coordinate, value2 : Coordinate, distanceLimit : number) : boolean => {
    let x = value2.X - value1.X;
    let y = value2.Y - value1.Y
    
    let distance = Math.sqrt(x * x + y * y);

    return distance <= distanceLimit;
}


interface Camera {
    type : string;
    id : string;
    geometry : {
        type : string;
        coordinates : number[];
    };
    properties : {
        roadStationId : number;
        id : string;
        name : string;
        nearestWeatherStationId : number;
    }
    weather : any;
}


const fetchWeatherData = async (stationId : string) : Promise<any> => {
    let retStation = {};
    return axios({
        method : 'get',
        url : `https://tie.digitraffic.fi/api/v1/data/weather-data/${stationId}`,
        headers: {
            'Accept-Encoding': 'gzip'
        }
    }).then( (response) => {
        for (let station of response.data.weatherStations) {
            retStation = station;
        };
        return retStation;
    }).catch( (error) => {
        console.log(error);
        return retStation;
    })
}


const fetchCameraStations = async () : Promise<Camera[]> => {
    let cameras : Camera[] = [];
    return axios({
        method : 'get',
        url : 'https://tie.digitraffic.fi/api/v3/metadata/camera-stations',
        headers: {
            'Accept-Encoding': 'gzip'
        }
    }).then( (response) => {
        for (let cam of response.data.features) {
            cameras.push(cam);
        };
        return cameras;
    }).catch( (error) => {
        console.log(error);
        return cameras;
    })
}


export default {getWeatherCameras};