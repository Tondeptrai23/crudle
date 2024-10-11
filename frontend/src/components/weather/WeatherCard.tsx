import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/ui/card';
import { Sun } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  location: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, condition, location }) => {
  return (
    <Card className='flex flex-row justify-between w-fit items-center'>
      <div>
        <CardHeader>
          <CardTitle>{location}</CardTitle>
          <CardDescription>{condition}</CardDescription>
        </CardHeader>
        <CardContent> 
          <h1 className="text-5xl font-semibold">{temperature}°C</h1>
        </CardContent>
      </div>
      <div className='p-6 pl-0'>
        <Sun className='w-32 h-32'/>
      </div>
    </Card>
  );
};
