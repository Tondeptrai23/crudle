import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/common/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { SkeletonWeatherCard } from '../../components/weather/SkeletonWeatherCard';
import { WeatherCard } from '../../components/weather/WeatherCard';
import { useWeatherApi } from '../../hooks/useWeatherApi';

export const WeatherPage: React.FC = () => {
  const [city, setCity] = useState('London');
  const { weatherData, loading, error } = useWeatherApi(city);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className='flex flex-col items-center justify-center pb-10'>
      <h1 className='m-10 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Weather Forecast
      </h1>
      <Select onValueChange={handleCityChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Choose a city' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='London'>London</SelectItem>
          <SelectItem value='New York'>New York</SelectItem>
          <SelectItem value='Ho Chi Minh City'>Ho Chi Minh City</SelectItem>
        </SelectContent>
      </Select>

      <div className='mt-8'>
        {loading ? (
          <SkeletonWeatherCard />
        ) : error ? (
          <Alert variant='destructive' className='w-[300px]'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : weatherData ? (
          <WeatherCard
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            location={weatherData.location}
          />
        ) : null}
      </div>
    </div>
  );
};
