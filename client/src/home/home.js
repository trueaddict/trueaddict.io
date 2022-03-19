import React, {useEffect, useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const fetchTime = async () => {
    return fetch(`/api/time?token=kissa`, {
        method: 'GET',
        headers: {},
    })
    .then( res => res.json())
    .catch(err => {
        console.log(err);
        return [];
    })
};

const Home = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [time, setTime] = useState('');

    
    useEffect(() => {
        (async () => {
            const data = await fetchTime();
            console.log(data);
            setTime(data.time);
        })();
    }, []);

    /*if (!state.isLoggedIn) {
        return <Navigate to="/login"/>;
    }*/

    return (
        <p>
            {time}
        </p>
    );
}

export default Home;