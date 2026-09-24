const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
const forecastUrl = 'https://api.open-meteo.com/v1/forecast';

const weatherCodes = {
  0: ['Clear sky', '☀'],
  1: ['Mainly clear', '🌤'],
  2: ['Partly cloudy', '🌤'],
  3: ['Overcast', '☁'],
  45: ['Foggy', '🌫'],
  48: ['Rime fog', '🌫'],
  51: ['Light drizzle', '🌦'],
  53: ['Drizzle', '🌦'],
  55: ['Heavy drizzle', '🌧'],
  61: ['Light rain', '🌦'],
  63: ['Rain', '🌧'],
  65: ['Heavy rain', '🌧'],
  71: ['Light snow', '🌨'],
  73: ['Snow', '❄'],
  75: ['Heavy snow', '❄'],
  80: ['Rain showers', '🌦'],
  81: ['Rain showers', '🌧'],
  82: ['Heavy showers', '⛈'],
  95: ['Thunderstorm', '⛈'],
  96: ['Thunderstorm with hail', '⛈'],
  99: ['Thunderstorm with hail', '⛈']
};

const weatherImages = {
  clear: {
    source: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=640&q=80',
    alt: 'Blue sky with soft white clouds'
  },
  cloudy: {
    source: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=640&q=80',
    alt: 'Dark clouds covering the sky'
  },
  rain: {
    source: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=640&q=80',
    alt: 'Rain falling over a city street'
  },
  snow: {
    source: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=640&q=80',
    alt: 'Snow-covered landscape'
  },
  fog: {
    source: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=640&q=80',
    alt: 'Fog drifting through a forest'
  },
  storm: {
    source: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=640&q=80',
    alt: 'Lightning illuminating a stormy sky'
  }
};

const elements = {
  form: document.querySelector('#weather-search-form'),
  input: document.querySelector('#city-search'),
  button: document.querySelector('#search-button'),
  status: document.querySelector('#search-status'),
  cityName: document.querySelector('#city-name'),
  updatedAt: document.querySelector('#updated-at'),
  temperature: document.querySelector('#temperature-value'),
  weatherIcon: document.querySelector('#weather-icon'),
  weatherImage: document.querySelector('#weather-image'),
  conditionName: document.querySelector('#condition-name'),
  feelsLike: document.querySelector('#feels-like'),
  highLow: document.querySelector('#high-low'),
  humidity: document.querySelector('#humidity'),
  wind: document.querySelector('#wind'),
  visibility: document.querySelector('#visibility'),
  forecastList: document.querySelector('#forecast-list')
};

function getWeatherDescription(code) {
  return weatherCodes[code] || ['Unknown conditions', '？'];
}

function getWeatherImage(code) {
  if (code === 0 || code === 1) return weatherImages.clear;
  if (code === 2 || code === 3) return weatherImages.cloudy;
  if (code === 45 || code === 48) return weatherImages.fog;
  if (code >= 51 && code <= 65 || code >= 80 && code <= 82) return weatherImages.rain;
  if (code >= 71 && code <= 77) return weatherImages.snow;
  if (code >= 95) return weatherImages.storm;
  return weatherImages.cloudy;
}

function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % directions.length];
}

function formatCityName(location) {
  return [location.name, location.country].filter(Boolean).join(', ');
}

function formatForecastDate(dateString) {
  return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${dateString}T12:00:00`));
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.classList.toggle('error', isError);
}

async function findCity(city) {
  const params = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
  const response = await fetch(`${geocodingUrl}?${params}`);

  if (!response.ok) {
    throw new Error('The city search is currently unavailable.');
  }

  const data = await response.json();
  if (!data.results?.length) {
    throw new Error(`No city found for “${city}”.`);
  }

  return data.results[0];
}

async function getWeather(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,visibility',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
    forecast_days: '5'
  });
  const response = await fetch(`${forecastUrl}?${params}`);

  if (!response.ok) {
    throw new Error('Weather data is currently unavailable.');
  }

  return response.json();
}

function renderWeather(location, weather) {
  const current = weather.current;
  const [description, icon] = getWeatherDescription(current.weather_code);
  const weatherImage = getWeatherImage(current.weather_code);

  elements.cityName.textContent = formatCityName(location);
  elements.updatedAt.textContent = `Updated ${new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}`;
  elements.temperature.textContent = Math.round(current.temperature_2m);
  elements.weatherIcon.textContent = icon;
  elements.weatherImage.src = weatherImage.source;
  elements.weatherImage.alt = weatherImage.alt;
  elements.conditionName.textContent = description;
  elements.feelsLike.textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;
  elements.highLow.textContent = `${Math.round(weather.daily.temperature_2m_max[0])}° / ${Math.round(weather.daily.temperature_2m_min[0])}°`;
  elements.humidity.textContent = `${current.relative_humidity_2m}%`;
  elements.wind.textContent = `${Math.round(current.wind_speed_10m)} km/h ${getWindDirection(current.wind_direction_10m)}`;
  elements.visibility.textContent = `${(current.visibility / 1000).toFixed(1)} km`;

  elements.forecastList.innerHTML = weather.daily.time.map((date, index) => {
    const [dayDescription, dayIcon] = getWeatherDescription(weather.daily.weather_code[index]);
    const dayName = index === 0 ? 'Today' : formatForecastDate(date);
    return `<article class="forecast-day">
      <h3>${dayName}</h3>
      <p class="forecast-icon" aria-hidden="true">${dayIcon}</p>
      <p>${dayDescription}</p>
      <p><strong>${Math.round(weather.daily.temperature_2m_max[index])}°</strong> / ${Math.round(weather.daily.temperature_2m_min[index])}°</p>
    </article>`;
  }).join('');
}

async function loadWeather(city) {
  elements.button.disabled = true;
  setStatus(`Searching for ${city}...`);

  try {
    const location = await findCity(city);
    setStatus(`Loading weather for ${formatCityName(location)}...`);
    const weather = await getWeather(location);
    renderWeather(location, weather);
    setStatus('');
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    elements.button.disabled = false;
  }
}

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = elements.input.value.trim();
  if (city) {
    loadWeather(city);
  }
});

loadWeather(elements.input.value);