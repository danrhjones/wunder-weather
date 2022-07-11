import React from 'react';
import { Weather } from '../../types';

const convertToCelsius = (f: string | number) => {
  return (
    ((+f - 32) * .5556).toFixed(1)
  );
};

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
        <WeatherItemLoading icon='flag' subject='Loading...' />
        <WeatherItemLoading icon='water_drop' subject='Loading...' />
        <WeatherItemLoading icon='opacity' subject='Loading...' />
        <WeatherItemLoading icon='light_mode' subject='Loading...' />
        <WeatherItemLoading icon='speed' subject='Loading...' />
        <CreditsItem />
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
        unit='imperial'
      />
      <WeatherItem
        subject='Rain Gage'
        icon='water_drop'
        rain={props.weather.imperial.precipTotal || '0'}
        rainRate={props.weather.imperial.percipRate || '0'}
        unit='imperial'
      />
      <WeatherItem
        subject='Wind'
        icon='air'
        unit='imperial'
        windGust={props.weather.imperial.windGust || '0'}
        windSpeed={props.weather.imperial.windSpeed || '0'}
      />
      <WeatherItem
        subject='Wind Direction'
        icon='flag'
        unit='imperial'
        windDir={props.weather.winddir || 0}
      />
      <WeatherItem
        subject='Humidity'
        icon='water_drop'
        humidity={props.weather.humidity || '0'}
        unit='imperial'
        error={
          props.weather.humidity === 1 ? 'Hardware malfunction.' : undefined
        }
      />
      <WeatherItem
        subject='Dew Point'
        icon='opacity'
        dewPoint={props.weather.imperial.dewpt || '0'}
        unit='imperial'
      />
      <WeatherItem
        subject='UV Index'
        icon='light_mode'
        unit='imperial'
        uv={props.weather.uv || '0'}
      />
      <WeatherItem
        subject='Air Pressure'
        icon='speed'
        pressure={props.weather.imperial.pressure || '0'}
        unit='imperial'
      />
      <CreditsItem />
    </div>
  );
}

const CreditsItem = () => {
  return (
    <div className='credits'>
      <h2>Website Credits</h2>
      <span aria-hidden='true' className='material-icons-outlined'>
        live_help
      </span>
      <p>
        API by <a href={'https://www.wunderground.com/'}>Wunderground</a>
      </p>
      <p>
        Website by <a href={'https://www.becky.dev/'}>Becky Pollard</a>
      </p>
    </div>
  );
};

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
        className={`material-icons${props.icon !== 'flag' ? '-outlined' : ''}`}
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
      //N
      return 'N';
    } else if (dir > 11 && dir <= 34) {
      //NNE
      return 'NNE';
    } else if (dir > 34 && dir <= 56) {
      //NE
      return 'NE';
    } else if (dir > 56 && dir <= 79) {
      //ENE
      return 'ENE';
    } else if (dir > 79 && dir <= 101) {
      //E
      return 'E';
    } else if (dir > 101 && dir <= 124) {
      //ESE
      return 'ESE';
    } else if (dir > 124 && dir <= 146) {
      //SE
      return 'SE';
    } else if (dir > 146 && dir <= 169) {
      //SSE
      return 'SSE';
    } else if (dir > 169 && dir <= 191) {
      //S
      return 'S';
    } else if (dir > 191 && dir <= 214) {
      //SSW
      return 'SSW';
    } else if (dir > 214 && dir <= 236) {
      //SW
      return 'SW';
    } else if (dir > 236 && dir <= 259) {
      //WSW
      return 'WSW';
    } else if (dir > 259 && dir <= 281) {
      //W
      return 'W';
    } else if (dir > 281 && dir <= 304) {
      //WNW
      return 'WNW';
    } else if (dir > 304 && dir <= 326) {
      //NW
      return 'NW';
    } else if (dir > 326 && dir <= 349) {
      //NNW
      return 'NW';
    }
    return 'ERROR';
  };

  return (
    <div className={props.error ? 'item itemError' : 'item'}>
      <h2>{props.subject}</h2>
      <span
        aria-hidden='true'
        className={`material-icons${props.icon !== 'flag' ? '-outlined' : ''}`}
      >
        {props.icon}
      </span>

      {props.temp && props.tempFeel ? (
        <>
          <p>{`${props.temp}°F / ${convertToCelsius(props.temp)}°C`}</p>
          <p>{`feels like ${props.tempFeel}°F or ${convertToCelsius(
            props.temp
          )}°C`}</p>
        </>
      ) : null}

      {props.rain && props.rainRate ? (
        <>
          <p>{`${props.rain} in`}</p>
          <p>
            {props.rainRate !== '0' ?? `at a rate of ${props.rainRate} in/hr`}
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
          <p>{`${props.pressure} in`}</p>
        </>
      ) : null}

      {props.uv ? (
        <>
          <p>{`${props.uv}`}</p>
        </>
      ) : null}

      {props.dewPoint ? (
        <>
          <p>{`${props.dewPoint}°F / ${convertToCelsius(props.dewPoint)}°C`}</p>
        </>
      ) : null}

      {props.error ? <p className='itemErrorText'>{props.error}</p> : null}
    </div>
  );
};
