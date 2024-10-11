export const fetchWeatherData = async (city: string) => {
  // Simulate an API request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const randomTemperature = Math.floor(Math.random() * 30);

  return {
    temperature: randomTemperature,
    condition: "Sunny", // I'm too lazy for multiple kinds of weather conditions
    location: city,
  };
};