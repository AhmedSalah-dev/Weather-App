import { useQuery } from "react-query";
import { Coordinates } from "../API/types";
import { weatherAPI } from "../API/weather";

export const WEATHER_KEYS= {
    weather:(coords:Coordinates)=> ["weather",coords] as const,
    forecast:(coords:Coordinates)=> ["forecast",coords] as const,
    location:(coords:Coordinates)=> ["location",coords] as const,
    
} as const;

export function useWeatherQuery(coordinates:Coordinates|null) {
   return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates?? {lat:0, lon:0}),
        queryFn:()=>coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    })

}
export function useForecastQuery(coordinates:Coordinates|null) {
   return useQuery({
        queryKey:WEATHER_KEYS.forecast(coordinates?? {lat:0, lon:0}),
        queryFn:()=>coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates
    })

}
export function useReverseQuery(coordinates:Coordinates|null) {
   return useQuery({
        queryKey:WEATHER_KEYS.location(coordinates?? {lat:0, lon:0}),
        queryFn:()=>coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates
    })

}