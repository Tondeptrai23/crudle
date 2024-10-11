/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/weatherUtils.ts';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export const useWeatherApi = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  return { weatherData, loading, error };
};