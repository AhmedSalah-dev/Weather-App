import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"
import { useGeolocation } from "../hooks/use-geolocation"
import WeatherSkeleton from "../component/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../component/ui/alert";
import { Button } from "../component/ui/Button";

const WeatherDashboard = () => {

  const {
    coordinates,
    error:locationError,
    getLocation,
    isLoading:locationLoading
      } = useGeolocation();

  console.log(coordinates)

  const handleRefresh=()=> {
     getLocation();
     if (coordinates) {
        //reload weather data
     }
  };

  if (locationLoading){
    return <WeatherSkeleton/>
  }

  if (locationError){
   return (
    <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>{locationError}</p>
      <Button 
        onClick={getLocation} 
        variant={"outline"} 
        className="w-fit">
         <MapPin className="mr-2 h-4 w-4"/>
         Enable Location
      </Button>
    </AlertDescription>
  </Alert>
   )
  }
  if (!coordinates){
   return (
    <Alert variant="destructive">
    <AlertTitle>Location Required</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>Please Enable location access to see your local weather</p>
      <Button 
        onClick={getLocation} 
        variant={"outline"} 
        className="w-fit">
         <MapPin className="mr-2 h-4 w-4"/>
         Enable Location
      </Button>
    </AlertDescription>
  </Alert>
   )
  }

  return ( 
  <div className="space-y-4">
    {/* Favorite Cities */}
    <div className="flex items-center justify-between ">
      <h1 className="text-xl font-bold tracking-tight">My Location</h1>
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={handleRefresh}
        >
        <RefreshCcw size={15}/>
      </Button>
    </div>
  </div>
    
  )
}

export default WeatherDashboard