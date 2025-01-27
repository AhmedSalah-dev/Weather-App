import { format } from "date-fns";
import type { ForecastData } from "../API/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface weatherForecastProps {
    data: ForecastData;
}

interface DailyForecasts {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id:number;
        main: string;
        description: string;
        icon:string;
    };
}

const WeatherForecast = ({data}:weatherForecastProps) => {

const dailyForecasts = data.list.reduce((acc,forecast)=>{

    const date = format(new Date(forecast.dt*1000), "yyyy-MM-dd");  

    if(!acc[date]) {
        acc[date] = {
            temp_min: forecast.main.temp_min,
            temp_max: forecast.main.temp_max,
            humidity: forecast.main.humidity,
            weather: forecast.weather[0],
            wind: forecast.wind.speed,
            date: forecast.dt,
        };
    }else {
        acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
        acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
},{} as Record<string, DailyForecasts>);

const nextDays = Object.values(dailyForecasts).slice(0, 6);

const formatTemp = (temp:number) => `${Math.round(temp)}°`;

  return (
    <Card>
        <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <p>{nextDays.map((day)=> {
                return (
                    <div 
                    key={day.date}
                    className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                    >
                        <div>
                            <p className="font-medium">
                                {format(new Date(day.date*1000), "EEE, MM, d")}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                                {day.weather.description}
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <span className="flex items-center text-blue-500">
                                <ArrowDown className=" h-4 w4"/>
                                {formatTemp(day.temp_min)}
                            </span>
                            <span className="flex items-center text-red-500">
                                <ArrowUp className=" h-4 w4"/>
                                {formatTemp(day.temp_max)}
                            </span>
                        </div>
                        <div className="flex justify-end gap-6 ">
                            <span className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-500"/>
                                <span className="text-sm">{day.humidity}%</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Wind className="h-4 w-4 text-blue-500"/>
                                <span className="text-sm">{day.wind}m/s</span>
                            </span>
                        </div>
                    </div>
                )
            })}</p>
        </CardContent>
        
   </Card>

  )
}

export default WeatherForecast