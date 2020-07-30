import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { weatherAPI } from '../util/weatherAPI';

export default function Details() {
    useEffect(() => {
        const zipcode = 10018
        navigator.geolocation.getCurrentPosition(position => {
            console.log("position", position);
            getCurrentWeather({ coords: position.coords });
            getForecastWeather({ coords: position.coords });
        })
    }, []);

    const getCurrentWeather = ({ zipcode, coords }) => {
        return weatherAPI('/weather', { zipcode, coords })
            .then(res => console.log('current response', res))
            .catch(err => {
                console.log('current error', err)
            })
    }

    const getForecastWeather = ({ zipcode, coords }) => {
        return weatherAPI('/forecast', { zipcode, coords })
            .then(res => console.log('forecast response', res))
            .catch(err => {
                console.log('forecast error', err)
            })
    }

    return (
        null
    )
}