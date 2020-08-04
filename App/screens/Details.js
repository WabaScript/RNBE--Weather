import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { weatherAPI } from '../util/weatherAPI';
import { Container } from '../components/Container';
import { WeatherIcon } from '../components/WeatherIcon';
import { BasicRow } from '../components/List';
import { H1, H2 } from '../components/Text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Details({ navigation }) {
    const [currentWeather, setCurrentWeather] = useState({});
    const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(true);

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
            .then(res => {
                console.log('current response', res)
                navigation.setParams({ title: res.name })
                setCurrentWeather(res)
                setLoadingCurrentWeather(false)
            })

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
        loadingCurrentWeather ?
            <Container>
                <ActivityIndicator color="#fff" size="large" />
            </Container> :


            <Container>
                <ScrollView>
                    <SafeAreaView>
                        <WeatherIcon icon={currentWeather.weather[0].icon} />
                        <H1 style={{ paddingTop: 14 }}>{`${Math.round(currentWeather.main.temp)}°`}</H1>
                        <BasicRow>
                            <H2>{`Humidity: ${currentWeather.main.humidity}%`}</H2>
                        </BasicRow>
                        <BasicRow>
                            <H2>{`Low: ${Math.round(currentWeather.main.temp_min)}°`}</H2>
                            <H2>{`High: ${Math.round(currentWeather.main.temp_max)}°`}</H2>
                        </BasicRow>
                    </SafeAreaView>
                </ScrollView>
            </Container>
    )
}