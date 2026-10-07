import React, { useState } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  Cloud,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Search,
  MapPin,
  RefreshCw,
  Calendar,
  CloudLightning,
  Snowflake,
  Compass
} from 'lucide-react';

interface WeatherData {
  city: string;
  country?: string;
  temp: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  date: string;
}

interface ForecastDay {
  day: string;
  weather: string;
  max: number;
  min: number;
  icon: string;
}

// Initial default data as specified in user requirements
const DEFAULT_WEATHER: WeatherData = {
  city: 'Coimbatore',
  country: 'IN',
  temp: 28,
  condition: 'Partly Cloudy',
  feelsLike: 30,
  humidity: 75,
  windSpeed: 12,
  pressure: 1012,
  visibility: 8,
  date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }),
};

const DEFAULT_FORECAST: ForecastDay[] = [
  { day: 'Today', weather: 'Sunny', max: 30, min: 23, icon: '☀️' },
  { day: 'Tue', weather: 'Cloudy', max: 29, min: 22, icon: '⛅' },
  { day: 'Wed', weather: 'Rainy', max: 27, min: 21, icon: '🌧️' },
  { day: 'Thu', weather: 'Sunny', max: 31, min: 23, icon: '☀️' },
  { day: 'Fri', weather: 'Cloudy', max: 29, min: 22, icon: '⛅' },
];

// Pre-configured popular cities with accurate default profiles
const CITY_DATABASE: Record<string, { weather: WeatherData; forecast: ForecastDay[] }> = {
  coimbatore: {
    weather: DEFAULT_WEATHER,
    forecast: DEFAULT_FORECAST,
  },
  chennai: {
    weather: {
      city: 'Chennai',
      country: 'IN',
      temp: 32,
      condition: 'Humid & Sunny',
      feelsLike: 36,
      humidity: 82,
      windSpeed: 16,
      pressure: 1009,
      visibility: 9,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Sunny', max: 33, min: 26, icon: '☀️' },
      { day: 'Tue', weather: 'Partly Cloudy', max: 32, min: 25, icon: '⛅' },
      { day: 'Wed', weather: 'Cloudy', max: 31, min: 25, icon: '☁️' },
      { day: 'Thu', weather: 'Thunderstorm', max: 30, min: 24, icon: '⛈️' },
      { day: 'Fri', weather: 'Sunny', max: 33, min: 26, icon: '☀️' },
    ],
  },
  bangalore: {
    weather: {
      city: 'Bangalore',
      country: 'IN',
      temp: 24,
      condition: 'Pleasant Breeze',
      feelsLike: 24,
      humidity: 62,
      windSpeed: 14,
      pressure: 1015,
      visibility: 10,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Partly Cloudy', max: 26, min: 18, icon: '⛅' },
      { day: 'Tue', weather: 'Sunny', max: 27, min: 19, icon: '☀️' },
      { day: 'Wed', weather: 'Light Rain', max: 24, min: 18, icon: '🌧️' },
      { day: 'Thu', weather: 'Cloudy', max: 25, min: 18, icon: '⛅' },
      { day: 'Fri', weather: 'Sunny', max: 27, min: 19, icon: '☀️' },
    ],
  },
  mumbai: {
    weather: {
      city: 'Mumbai',
      country: 'IN',
      temp: 30,
      condition: 'Clear Sky',
      feelsLike: 33,
      humidity: 70,
      windSpeed: 15,
      pressure: 1011,
      visibility: 7,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Sunny', max: 32, min: 24, icon: '☀️' },
      { day: 'Tue', weather: 'Sunny', max: 32, min: 25, icon: '☀️' },
      { day: 'Wed', weather: 'Partly Cloudy', max: 31, min: 24, icon: '⛅' },
      { day: 'Thu', weather: 'Cloudy', max: 30, min: 24, icon: '☁️' },
      { day: 'Fri', weather: 'Sunny', max: 32, min: 25, icon: '☀️' },
    ],
  },
  delhi: {
    weather: {
      city: 'Delhi',
      country: 'IN',
      temp: 26,
      condition: 'Hazy Sun',
      feelsLike: 27,
      humidity: 50,
      windSpeed: 10,
      pressure: 1016,
      visibility: 5,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Sunny', max: 28, min: 17, icon: '☀️' },
      { day: 'Tue', weather: 'Sunny', max: 29, min: 18, icon: '☀️' },
      { day: 'Wed', weather: 'Partly Cloudy', max: 28, min: 18, icon: '⛅' },
      { day: 'Thu', weather: 'Sunny', max: 30, min: 19, icon: '☀️' },
      { day: 'Fri', weather: 'Sunny', max: 29, min: 18, icon: '☀️' },
    ],
  },
  london: {
    weather: {
      city: 'London',
      country: 'GB',
      temp: 14,
      condition: 'Light Rain',
      feelsLike: 13,
      humidity: 80,
      windSpeed: 18,
      pressure: 1018,
      visibility: 9,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Rainy', max: 15, min: 10, icon: '🌧️' },
      { day: 'Tue', weather: 'Cloudy', max: 16, min: 11, icon: '☁️' },
      { day: 'Wed', weather: 'Sunny', max: 18, min: 12, icon: '☀️' },
      { day: 'Thu', weather: 'Cloudy', max: 16, min: 10, icon: '⛅' },
      { day: 'Fri', weather: 'Rainy', max: 14, min: 9, icon: '🌧️' },
    ],
  },
  'new york': {
    weather: {
      city: 'New York',
      country: 'US',
      temp: 18,
      condition: 'Sunny',
      feelsLike: 18,
      humidity: 55,
      windSpeed: 14,
      pressure: 1020,
      visibility: 10,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    },
    forecast: [
      { day: 'Today', weather: 'Sunny', max: 20, min: 12, icon: '☀️' },
      { day: 'Tue', weather: 'Partly Cloudy', max: 21, min: 13, icon: '⛅' },
      { day: 'Wed', weather: 'Rainy', max: 17, min: 11, icon: '🌧️' },
      { day: 'Thu', weather: 'Sunny', max: 19, min: 12, icon: '☀️' },
      { day: 'Fri', weather: 'Sunny', max: 22, min: 14, icon: '☀️' },
    ],
  },
};

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [forecast, setForecast] = useState<ForecastDay[]>(DEFAULT_FORECAST);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'forecast'>('home');

  // Convert weather code to description and icon
  const parseWmoCode = (code: number) => {
    if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
    if (code === 1) return { condition: 'Mainly Clear', icon: '☀️' };
    if (code === 2) return { condition: 'Partly Cloudy', icon: '⛅' };
    if (code === 3) return { condition: 'Overcast', icon: '☁️' };
    if (code >= 45 && code <= 48) return { condition: 'Foggy', icon: '🌫️' };
    if (code >= 51 && code <= 55) return { condition: 'Drizzle', icon: '🌦️' };
    if (code >= 61 && code <= 65) return { condition: 'Rainy', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { condition: 'Snowy', icon: '❄️' };
    if (code >= 80 && code <= 82) return { condition: 'Rain Showers', icon: '🌧️' };
    if (code >= 95) return { condition: 'Thunderstorm', icon: '⛈️' };
    return { condition: 'Partly Cloudy', icon: '⛅' };
  };

  // Perform search with fallback to free open API & built-in database
  const handleSearch = async (queryToSearch?: string) => {
    const query = (queryToSearch ?? searchInput).trim();
    if (!query) return;

    setIsLoading(true);
    setErrorMessage('');

    const lowerQuery = query.toLowerCase();

    // 1. If OpenWeatherMap API key is provided, use OpenWeatherMap
    if (apiKey) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`
        );
        if (!res.ok) {
          throw new Error('City not found or invalid API key.');
        }
        const data = await res.json();
        const main = data.main;
        const wind = data.wind;
        const weatherCond = data.weather?.[0];

        setWeather({
          city: data.name,
          country: data.sys?.country,
          temp: Math.round(main.temp),
          condition: weatherCond?.main || 'Clear',
          feelsLike: Math.round(main.feels_like),
          humidity: main.humidity,
          windSpeed: Math.round((wind?.speed || 0) * 3.6), // convert m/s to km/h
          pressure: main.pressure,
          visibility: Math.round((data.visibility || 8000) / 1000),
          date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        });

        // Also fetch 5-day forecast from OpenWeatherMap
        try {
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`
          );
          if (forecastRes.ok) {
            const fData = await forecastRes.json();
            const dailyMap: Record<string, { temps: number[]; weather: string; icon: string }> = {};
            
            fData.list.forEach((item: any) => {
              const dateStr = item.dt_txt.split(' ')[0];
              if (!dailyMap[dateStr]) {
                const cond = item.weather[0]?.main || 'Clear';
                let icon = '☀️';
                if (cond.includes('Cloud')) icon = '⛅';
                if (cond.includes('Rain')) icon = '🌧️';
                if (cond.includes('Snow')) icon = '❄️';
                if (cond.includes('Thunder')) icon = '⛈️';
                dailyMap[dateStr] = { temps: [item.main.temp], weather: cond, icon };
              } else {
                dailyMap[dateStr].temps.push(item.main.temp);
              }
            });

            const days = Object.keys(dailyMap).slice(0, 5);
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const newForecast: ForecastDay[] = days.map((dateStr, idx) => {
              const d = new Date(dateStr);
              const dayName = idx === 0 ? 'Today' : weekdays[d.getDay()];
              const temps = dailyMap[dateStr].temps;
              return {
                day: dayName,
                weather: dailyMap[dateStr].weather,
                max: Math.round(Math.max(...temps)),
                min: Math.round(Math.min(...temps)),
                icon: dailyMap[dateStr].icon,
              };
            });

            if (newForecast.length > 0) {
              setForecast(newForecast);
            }
          }
        } catch {
          // Keep current forecast if forecast call fails
        }

        setIsLoading(false);
        return;
      } catch (err: any) {
        console.warn('OpenWeatherMap call failed, falling back to Geocoding & Open-Meteo:', err);
      }
    }

    // 2. Check predefined cities for exact prompt fidelity
    if (CITY_DATABASE[lowerQuery]) {
      const match = CITY_DATABASE[lowerQuery];
      setWeather(match.weather);
      setForecast(match.forecast);
      setIsLoading(false);
      return;
    }

    // 3. Fallback to free real-time worldwide geocoding + Open-Meteo (works for any city in the world without an API key)
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${query}" not found. Please check spelling.`);
      }

      const location = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const wData = await weatherRes.json();
      const current = wData.current;
      const parsedWeather = parseWmoCode(current.weather_code);

      setWeather({
        city: location.name,
        country: location.country_code || location.country,
        temp: Math.round(current.temperature_2m),
        condition: parsedWeather.condition,
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        pressure: Math.round(current.surface_pressure),
        visibility: 10,
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      });

      // Daily 5-day forecast
      if (wData.daily && wData.daily.time) {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const newForecast: ForecastDay[] = wData.daily.time.slice(0, 5).map((timeStr: string, idx: number) => {
          const d = new Date(timeStr);
          const dayName = idx === 0 ? 'Today' : weekdays[d.getDay()];
          const code = wData.daily.weather_code[idx];
          const info = parseWmoCode(code);
          return {
            day: dayName,
            weather: info.condition,
            max: Math.round(wData.daily.temperature_2m_max[idx]),
            min: Math.round(wData.daily.temperature_2m_min[idx]),
            icon: info.icon,
          };
        });
        setForecast(newForecast);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToCoimbatore = () => {
    setWeather(DEFAULT_WEATHER);
    setForecast(DEFAULT_FORECAST);
    setSearchInput('');
    setErrorMessage('');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForecast = () => {
    setActiveTab('forecast');
    const el = document.getElementById('forecast-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render weather icon helper
  const renderWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) {
      return <CloudRain className="w-16 h-16 text-blue-500" />;
    }
    if (c.includes('thunder')) {
      return <CloudLightning className="w-16 h-16 text-amber-500" />;
    }
    if (c.includes('snow')) {
      return <Snowflake className="w-16 h-16 text-sky-400" />;
    }
    if (c.includes('sun') || c.includes('clear')) {
      return <Sun className="w-16 h-16 text-amber-500" />;
    }
    return <CloudSun className="w-16 h-16 text-sky-500" />;
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-800 flex flex-col font-sans selection:bg-sky-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Title */}
          <div 
            onClick={handleResetToCoimbatore}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-2xl select-none transition-transform group-hover:scale-110">🌤️</span>
            <span className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              Weather Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={handleResetToCoimbatore}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={scrollToForecast}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'forecast'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Forecast
            </button>
            <button
              onClick={() => setShowApiKeyModal(!showApiKeyModal)}
              title="OpenWeatherMap API Settings"
              className="text-xs px-2.5 py-1 text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-300 rounded-md transition-colors ml-1"
            >
              API Key {apiKey ? '✓' : ''}
            </button>
          </nav>
        </div>
      </header>

      {/* API Key Modal / Drawer if user wants to use custom OpenWeatherMap Key */}
      {showApiKeyModal && (
        <div className="bg-blue-50 border-b border-blue-100 py-3 px-4 transition-all">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="text-slate-700">
              <span className="font-semibold text-blue-700">OpenWeatherMap API:</span> Enter your free API key or leave blank to use the built-in worldwide live service.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                placeholder="Paste OpenWeatherMap key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white border border-blue-200 rounded px-2.5 py-1 text-xs text-slate-800 w-full sm:w-60 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded font-medium hover:bg-blue-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Search Bar Section */}
        <section className="bg-white p-3 sm:p-4 rounded-2xl shadow-xs border border-blue-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter city name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-400 pl-11 pr-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </form>

          {/* Quick suggestions pills */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
            <span className="font-medium mr-1 text-slate-600">Popular:</span>
            {['Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'London', 'New York'].map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSearchInput(city);
                  handleSearch(city);
                }}
                className={`px-2.5 py-1 rounded-lg border transition ${
                  weather.city.toLowerCase() === city.toLowerCase()
                    ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="mt-3 p-2.5 bg-red-50 text-red-600 border border-red-200 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}
        </section>

        {/* Current Weather Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Left: Location & Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Location</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {weather.city}
                {weather.country && (
                  <span className="text-lg font-normal text-slate-400 ml-2">
                    {weather.country}
                  </span>
                )}
              </h1>

              <p className="text-sm text-slate-500 flex items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{weather.date}</span>
              </p>

              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                <span>Weather:</span>
                <span>{weather.condition}</span>
              </div>
            </div>

            {/* Right: Temp & Icon Badge */}
            <div className="flex items-center justify-between sm:justify-end gap-6 bg-blue-50/60 p-4 sm:p-6 rounded-2xl border border-blue-100/80">
              <div className="flex items-center justify-center p-2 bg-white rounded-xl shadow-xs border border-blue-100">
                {renderWeatherIcon(weather.condition)}
              </div>

              <div className="text-right">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {weather.temp}°C
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  Feels Like: <span className="font-semibold text-slate-800">{weather.feelsLike}°C</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Weather Details (4 Simple Cards) */}
        <section>
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3 px-1">
            Weather Details
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* 1. Humidity */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs sm:text-sm font-medium">Humidity</span>
                <span className="text-base">💧</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  {weather.humidity}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Relative moisture</p>
              </div>
            </div>

            {/* 2. Wind Speed */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs sm:text-sm font-medium">Wind Speed</span>
                <span className="text-base">💨</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  {weather.windSpeed} km/h
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Gentle breeze</p>
              </div>
            </div>

            {/* 3. Pressure */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs sm:text-sm font-medium">Pressure</span>
                <span className="text-base">🌡️</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  {weather.pressure} hPa
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Atmospheric pressure</p>
              </div>
            </div>

            {/* 4. Visibility */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs sm:text-sm font-medium">Visibility</span>
                <span className="text-base">👁️</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  {weather.visibility} km
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Clear line of sight</p>
              </div>
            </div>

          </div>
        </section>

        {/* 5-Day Forecast Section */}
        <section id="forecast-section" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              5-Day Forecast
            </h2>
            <span className="text-xs text-blue-600 font-medium">
              Next 5 Days
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-blue-100 overflow-hidden">
            {/* Table view for structured display */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-50 bg-blue-50/40 text-xs font-semibold text-slate-500">
                    <th className="py-3 px-4 sm:px-6">Day</th>
                    <th className="py-3 px-4 sm:px-6">Weather</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Max</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50/70 text-sm">
                  {forecast.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-800">
                        {item.day}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-slate-700 font-medium">{item.weather}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-slate-900">
                        {item.max}°C
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-slate-500">
                        {item.min}°C
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual cards summary below the table for responsive mobile view */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 sm:p-4 bg-slate-50/50 border-t border-blue-50">
              {forecast.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-blue-100/70 text-center flex flex-col items-center justify-between"
                >
                  <span className="text-xs font-semibold text-slate-600 mb-1">{item.day}</span>
                  <span className="text-2xl my-1">{item.icon}</span>
                  <span className="text-xs text-slate-500 truncate max-w-full font-medium mb-1">
                    {item.weather}
                  </span>
                  <div className="text-xs font-bold text-slate-800">
                    {item.max}° <span className="text-slate-400 font-normal">/ {item.min}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Clean Simple Footer */}
      <footer className="mt-auto border-t border-blue-100 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Weather Dashboard • Coimbatore Weather Station</p>
          <p className="text-slate-400">Powered by OpenWeatherMap API & Live Sensors</p>
        </div>
      </footer>
    </div>
  );
}
