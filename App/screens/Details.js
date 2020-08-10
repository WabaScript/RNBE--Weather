import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import { weatherAPI } from '../util/weatherAPI';
import { Container } from '../components/Container';
import { WeatherIcon } from '../components/WeatherIcon';
import { BasicRow } from '../components/List';
import { H1, H2, P } from '../components/Text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { storeRecentSearch } from '../util/RecentSearch';

const groupForecastByDay = list => {
    const data = {}

    list.forEach(item => {
        const [day] = item.dt_txt.split(" ");
        if (data[day]) {
            if (data[day].temp_max < item.main.temp_max) {
                data[day].temp_max = item.main.temp_max;
            }
            if (data[day].temp_min > item.main.temp_min) {
                data[day].temp_min = item.main.temp_min;
            }
        } else {
            data[day] = {
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max
            };
        }
    });

    const formattedList = Object.keys(data).map(key => {
        return {
            day: key,
            ...data[key]
        }
    })
    return formattedList;
}

export default function Details({ navigation, route }) {
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(true);
    const [loadingForecast, setLoadingForecast] = useState(true);

    const handleError = () => {
        Alert.alert('No location data found', 'Please try again!', [
            {
                text: "Take me back",
                onPress: () => navigation.navigate('Search')
            }
        ]);
    };

    useEffect(() => {
        const lat = route.params?.lat
        const lon = route.params?.lon
        if (lat && lon) {
            getCurrentWeather({ coords: { latitude: lat, longitude: lon } })
            getForecastWeather({ coords: { latitude: lat, longitude: lon } })
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                getCurrentWeather({ coords: position.coords });
                getForecastWeather({ coords: position.coords });
            })
        }
    }, [route.params?.lat, route.params?.lon]);


    useEffect(() => {
        const zip = route.params?.zipcode
        if (zip) {
            getCurrentWeather({ zipcode: zip })
            getForecastWeather({ zipcode: zip })
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                getCurrentWeather({ coords: position.coords });
                getForecastWeather({ coords: position.coords });
            })
        }
    }, [route.params?.zipcode]);

    const getCurrentWeather = ({ zipcode, coords }) => {
        return weatherAPI('/weather', { zipcode, coords })
            .then(res => {
                if (Math.floor(res.cod / 100) === 4) {
                    handleError();
                } else {
                    navigation.setParams({ title: res.name });
                    setCurrentWeather(res);
                    setLoadingCurrentWeather(false);
                    storeRecentSearch({
                        id: res.id,
                        name: res.name,
                        lat: res.coord.lat,
                        lon: res.coord.lon
                    });
                }
            })
            .catch(err => {
                handleError();
                console.log('current error', err)
            })
    }
    // console.log(currentWeather)
    const getForecastWeather = ({ zipcode, coords }) => {
        return weatherAPI('/forecast', { zipcode, coords })
            .then(res => {
                if (Math.floor(res.cod / 100) !== 4) {
                    setForecast(groupForecastByDay(res.list));
                    setLoadingForecast(false);
                }
            })
            .catch(err => {
                handleError();
                console.log('forecast error', err)
            })
    }

    // console.log(route.params?.zipcode ?? "woops")
    return (
        loadingCurrentWeather || loadingForecast ?
            <Container>
                <ActivityIndicator color="#fff" size="large" />
            </Container>

            :

            <Container>
                <ScrollView>
                    {currentWeather &&
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

                            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                                {forecast.map(day => (
                                    <BasicRow
                                        key={day.day}
                                        style={{ justifyContent: 'space-between' }}
                                    >
                                        <P>{format(new Date(day.day), 'cccc')}</P>
                                        <View style={{ flexDirection: 'row' }}>
                                            <P style={{ fontWeight: '700', marginRight: 10 }}>
                                                {Math.round(day.temp_max)}
                                            </P>
                                            <P>{Math.round(day.temp_min)}</P>
                                        </View>
                                    </BasicRow>
                                ))}
                            </View>
                        </SafeAreaView>
                    }
                </ScrollView>
            </Container>
    )
}