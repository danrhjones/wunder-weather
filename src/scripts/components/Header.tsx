import React from 'react';
import { DateTime } from 'luxon';

type CurrentWeatherProps = {
  station?: string,
  time?: Date,
}
export default function CurrentWeather(props: CurrentWeatherProps) {
  const time = props.time
    ? DateTime.fromISO(new Date(props.time).toISOString()).toFormat('ccc MMMM dd, yyyy - h:mm a')
    : '';
  return (
    <header>
        <h1>Pollard Farm</h1>
        {props.station
          ? <p>Weather Station: <a href={`https://www.wunderground.com/dashboard/pws/${props.station}`}>
              {props.station}
            </a>
          </p>
          : <p>Loading...</p>
        }
        <p>{time}</p>
      </header>
  );
};
