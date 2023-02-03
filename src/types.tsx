export type Weather = {
  country: string;
  epoch: number;
  humidity: number;
  imperial : {
    dewpt: number;
    elev: number;
    heatIndex: number;
    percipRate: number;
    precipTotal: number;
    pressure: number;
    temp: number;
    windChill: number;
    windGust: number;
    windSpeed: number;
  };
  lat: number;
  lon: number;
  neighbourhood: string;
  obsTimeLocaobsTimeUtcl: string;
  obsTimeUtc: string;
  qcStatus: number;
  realtimeFrequency: number | null;
  softwareType: string;
  stationID: string;
  uv: number;
  winddir: number;
}
