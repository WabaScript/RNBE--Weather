import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Details() {

    useEffect(() => {
        const zipcode = 10018
        navigator.geolocation.getCurrentPosition(position => {
            console.log("position", position);
        })
        getCurrentWeather({ zipcode });
        getForecastWeather();
    }, []);

    const getCurrentWeather = ({ zipcode, coords }) => {
        let suffix = "";
        if (zipcode) {
            suffix = `zip=${zipcode}`;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=xxxxxx&units=imperial&${suffix}`)
            .then(res => res.json())
            .then(res => console.log('current response', res))
            .catch(err => {
                console.log('current error', err)
            })
    }

    const getForecastWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=xxxxxx&units=imperial`)
            .then(res => res.json())
            .then(res => console.log('forecast response', res))
            .catch(err => {
                console.log('current error', err)
            })

    }

    return (
        null
    )
}