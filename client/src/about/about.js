import React, {useEffect, useState} from "react";


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

const About = () => {
    const [time, setTime] = useState('');


    useEffect(() => {
        (async () => {
            const data = await fetchTime();
            console.log(data);
            setTime(data.time);
        })();
    }, []);

    return (
        <p>
            {time}
        </p>
    );
}

export default About;