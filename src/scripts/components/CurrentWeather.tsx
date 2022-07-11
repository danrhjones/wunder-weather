import React from 'react';
import { Weather } from '../../types';

const convertToCelsius = (f: string | number) => {
  return (
    ((+f - 32) * .5556).toFixed(1)
  );
};

const convertToHpa = (f: string | number) => {
    return (+f / 0.029529980164712).toFixed(2)
}

const convertInchesToMm = (f: string | number) => {
    return (+f / 25.4).toFixed(2)
}

type CurrentWeatherProps = {
  time?: Date;
  weather?: Weather;
};
export default function CurrentWeather(props: CurrentWeatherProps) {
  if (!props.weather) {
    return (
      <div className='weather-report'>
        <WeatherItemLoading icon='thermostat' subject='Loading...' />
        <WeatherItemLoading icon='water_drop' subject='Loading...' />
        <WeatherItemLoading icon='air' subject='Loading...' />
        <WeatherItemLoading icon='explore' subject='Loading...' />
        <WeatherItemLoading icon='water_drop' subject='Loading...' />
        <WeatherItemLoading icon='opacity' subject='Loading...' />
        <WeatherItemLoading icon='light_mode' subject='Loading...' />
        <WeatherItemLoading icon='speed' subject='Loading...' />
      </div>
    );
  }

  let tempFeel;
  if (props.weather.imperial.temp >= 70) {
    tempFeel = props.weather.imperial.heatIndex;
  } else if (props.weather.imperial.temp <= 61) {
    tempFeel = props.weather.imperial.windChill;
  } else {
    tempFeel = props.weather.imperial.temp;
  }

  return (
    <div className='weather-report'>
      <WeatherItem
        icon='thermostat'
        subject='Temperature'
        temp={props.weather.imperial.temp || '0'}
        tempFeel={tempFeel}
        unit='metric'
      />
      <WeatherItem
        subject='Rain'
        icon='water_drop'
        rain={props.weather.imperial.precipTotal || '0'}
        rainRate={props.weather.imperial.percipRate || '0'}
        unit='metric'
      />
      <WeatherItem
        subject='Wind'
        icon='air'
        unit='metric'
        windGust={props.weather.imperial.windGust || '0'}
        windSpeed={props.weather.imperial.windSpeed || '0'}
      />
      <WeatherItem
        subject='Wind Direction'
        icon='explore'
        unit='metric'
        windDir={props.weather.winddir || 0}
      />
      <WeatherItem
        subject='Humidity'
        icon='water_drop'
        humidity={props.weather.humidity || '0'}
        unit='metric'
        error={
          props.weather.humidity === 1 ? 'Hardware malfunction.' : undefined
        }
      />
      <WeatherItem
        subject='Dew Point'
        icon='opacity'
        dewPoint={props.weather.imperial.dewpt || '0'}
        unit='metric'
      />
      <WeatherItem
        subject='Air Pressure'
        icon='speed'
        pressure={props.weather.imperial.pressure || '0'}
        unit='imperial'
      />
    </div>
  );
}


type WeatherItemLoadingProps = {
  icon: string;
  subject: string;
};
const WeatherItemLoading = (props: WeatherItemLoadingProps) => {
  return (
    <div className='item'>
      <h2>{props.subject}</h2>
      <span
        aria-hidden='true'
        className={`material-icons${props.icon !== 'explore' ? '-outlined' : ''}`}
      >
        {props.icon}
      </span>
      <p>0</p>
    </div>
  );
};

type WeatherItemProps = {
  dewPoint?: number | string;
  error?: string;
  humidity?: number | string;
  icon: string;
  pressure?: number | string;
  rain?: number | string;
  rainRate?: number | string;
  subject: string;
  temp?: number | string;
  tempFeel?: number | string;
  unit: 'imperial' | 'metric';
  uv?: number | string;
  windGust?: number | string;
  windSpeed?: number | string;
  windDir?: number;
};
const WeatherItem = (props: WeatherItemProps) => {
  const windDirection = (dir: number) => {
    if ((dir > 349 && dir <= 360) || dir <= 11) {
      return 'North';
    } else if (dir > 11 && dir <= 34) {
      return 'North North East';
    } else if (dir > 34 && dir <= 56) {
      return 'North East';
    } else if (dir > 56 && dir <= 79) {
      return 'East North East';
    } else if (dir > 79 && dir <= 101) {
      return 'East';
    } else if (dir > 101 && dir <= 124) {
      return 'East South East';
    } else if (dir > 124 && dir <= 146) {
      return 'South East';
    } else if (dir > 146 && dir <= 169) {
      return 'South South East';
    } else if (dir > 169 && dir <= 191) {
      return 'South';
    } else if (dir > 191 && dir <= 214) {
      return 'South South West';
    } else if (dir > 214 && dir <= 236) {
      return 'South West';
    } else if (dir > 236 && dir <= 259) {
      return 'West South West';
    } else if (dir > 259 && dir <= 281) {
      return 'West';
    } else if (dir > 281 && dir <= 304) {
      return 'West North West';
    } else if (dir > 304 && dir <= 326) {
      return 'North West';
    } else if (dir > 326 && dir <= 349) {
      return 'North North West';
    }
    return 'ERROR';
  };

  return (
    <div className={props.error ? 'item itemError' : 'item'}>
      <h2>{props.subject}</h2>
      <span
        aria-hidden='true'
        className={`material-icons${props.icon !== 'explore' ? '-outlined' : ''}`}
      >
        {props.icon}
      </span>

      {props.temp && props.tempFeel ? (
        <>
            <p>{props.temp > 20 ?  'yikes' : 'nope'}</p>
            <div style={isMarginNeeded ? {marginTop:10} : {}} />
            <p>{`${convertToCelsius(props.temp)}°C`}</p>
          <p>{`feels like ${convertToCelsius(
            props.temp
          )}°C`}</p>
        </>
      ) : null}

      {props.rain && props.rainRate ? (
        <>
          <p>{`${convertInchesToMm(props.rain)} mm`}</p>
          <p>
              {props.rainRate == 0 ? '' : `at a rate of ${convertInchesToMm(props.rainRate)} mm/hr` }
          </p>
        </>
      ) : null}

      {props.humidity && !props.error ? <p>{`${props.humidity}%`}</p> : null}

      {props.windGust && props.windSpeed ? (
        <>
          <p>{`${props.windSpeed} mph`}</p>
          <p>
            {props.windSpeed !== '0'
              ? `with ${props.windGust} mph gusts`
              : 'No wind'}
          </p>
        </>
      ) : null}

      {props.windDir ? (
        <>
          <p>{`${windDirection(props.windDir)}`}</p>
        </>
      ) : null}

      {props.pressure ? (
        <>
          <p>{`${convertToHpa(props.pressure)} hPa`}</p>
        </>
      ) : null}

      {props.uv ? (
        <>
          <p>{`${props.uv}`}</p>
        </>
      ) : null}

      {props.dewPoint ? (
        <>
          <p>{`${convertToCelsius(props.dewPoint)}°C`}</p>
        </>
      ) : null}

      {props.error ? <p className='itemErrorText'>{props.error}</p> : null}
    </div>
  );
};
