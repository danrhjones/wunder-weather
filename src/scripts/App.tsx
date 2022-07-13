import React, {useState, useEffect} from 'react';

import CurrentWeather from './components/CurrentWeather';
import Header from './components/Header';
import SunCalc from "suncalc";

function App() {
    const [weather, setWeather] = useState<any>();
    const [weatherTime, setWeatherTime] = useState<Date>();
    const [loading, setLoading] = useState<boolean>(true);
    const [poop, setMoonPhase] = useState<any>();
    // const [theme, setTheme] = useState<string>('theme-day-clear');
    // const [daytime, setSun] = useState<boolean>(true); // WIP idea to track sunrise/sunset


    const getCurrentWeather = () => {
        const key = process.env.API_KEY;
        const station = 'ILEIGH28';
        fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=e&apiKey=${key}&numericPrecision=decimal`)
            .then(response => response.json())
            .then(data => {
                setWeather(data.observations[0]);
                setWeatherTime(new Date(data.observations[0].epoch * 1000));
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    const phase = () => {
        setMoonPhase(SunCalc.getMoonIllumination(new Date()).phase.toFixed(2))
    }

    useEffect(() => {
        getCurrentWeather();
        setLoading(false);
        phase()
    }, []);

    if (loading || !weather) {
        return (
            <div className='wrapper'>
                <Header/>
                <CurrentWeather/>
            </div>
        );
    }
    console.log('🌦 Weather API from Wunderground:', weather); //to show dad how the data looks

    // WIP idea to track sunrise/sunset
    // const setSun = (time: Date) => {
    //   const sun = SunCalc.getTimes(time, weather.lat, weather.lon)
    //   console.log('sunset = ', sun.sunset);
    //   console.log('sunrise = ', sun.sunrise);
    //   console.log('current time = ', time);
    // }

    // const shuttupTypescript = true; // TEMP!! ONLY FOR WIP WORK!
    // if (!shuttupTypescript) { //silence TS unused errors
    //   console.info('shuttup typescript', setTheme, theme, setSun);
    // }

    return (
        <div className='wrapper'>
            <Header
                station={weather.stationID}
                time={weatherTime}
            />
            <CurrentWeather
                time={weatherTime}
                weather={weather}
                moon={poop}
            />
        </div>
    );
}

export default App;
