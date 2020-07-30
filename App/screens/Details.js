import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Details() {
    const zipcode = 10018
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=xxxxx&zip=${zipcode}&units=imperial`)
            .then(res => res.json())
            .then(res => console.log('current response', res))
            .catch(err => {
                console.log('current error', err)
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=xxxxx&zip=${zipcode}&units=imperial`)
            .then(res => res.json())
            .then(res => console.log('forecast response', res))
            .catch(err => {
                console.log('current error', err)
            })
    }, []);

    return (
        null
    )
}