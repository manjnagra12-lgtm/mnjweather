# mnjweather

A lightweight, browser-only weather application for searching cities around the world and viewing current conditions plus a five-day forecast. It uses only HTML, CSS, and JavaScript depolyed to github pages.

## Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Wireframes](#wireframes)
- [APIs And External Resources](#apis-and-external-resources)
- [How It Works](#how-it-works)
- [Use Cases](#use-cases)
- [Customization](#customization)
- [Current Limitations](#current-limitations)

## Features

- Search for cities worldwide.
- Display the current temperature, feels-like temperature, humidity, wind, visibility, and daily high/low.
- Show a five-day forecast with weather icons and temperature ranges.
- Update the central weather image for clear, cloudy, rainy, snowy, foggy, and stormy conditions.
- Responsive layout for desktop and mobile screens.
- Bootstrap 5 utility classes and Bootstrap Icons for responsive controls and social links.
- Accessible labels, status messages, image alt text, and navigation landmarks.

## Technology Stack

- **HTML5:** Page structure, forms, semantic elements, and accessibility landmarks.
- **CSS3:** Responsive layout, custom styling, typography, colors, and mobile behavior.
- **Vanilla JavaScript:** City search, API requests, weather rendering, formatting, and forecast updates.
- **Bootstrap 5.3.3:** Utility classes and responsive helpers.
- **Bootstrap Icons 1.11.3:** Social media icons in the footer.
- **Open-Meteo APIs:** Geocoding and weather forecast data.
- **Unsplash:** Weather condition images.

## Project Structure

```text
mnjweather/
├── index.html   # Page structure and content
├── styles.css   # Custom layout, colors, typography, and responsive styles
├── app.js       # City search, API requests, rendering, and weather image mapping
└── README.md    # Project documentation
```

## Wireframes

### Desktop

```text
+------------------------------------------------------------------------------+
| mnjweather                                      Current weather   Forecast   |
+------------------------------------------------------------------------------+
| Weather around the world                                                    |
| Find a city and see what it feels like there.                               |
| [ Search for a city                         ] [ Search ]                    |
+------------------------------------------------------------------------------+
| Right now                                      Updated just now              |
| New York, United States                                                     |
|                                                                            |
|       18 °C        [weather image]       Clear skies                         |
|                                                                            |
| High / low     Humidity       Wind           Visibility                      |
| 21° / 14°      58%            12 km/h NW     10 km                           |
+------------------------------------------------------------------------------+
| Looking ahead                                                               |
| 5-day forecast                                                              |
| [ Today ] [ Tuesday ] [ Wednesday ] [ Thursday ] [ Friday ]                 |
| [ icon  ] [ icon    ] [ icon     ] [ icon   ] [ icon ]                      |
+------------------------------------------------------------------------------+
| mnjweather                         Weather data note       Instagram X Facebook|
+------------------------------------------------------------------------------+
```

### Mobile

```text
+------------------------------+
| mnjweather                    |
+------------------------------+
| Weather around the world     |
| Find a city and see what it  |
| feels like there.            |
| [ Search for a city          ]|
| [          Search           ]|
+------------------------------+
| Right now                    |
| New York, United States      |
| 18 °C                        |
| Clear skies                  |
| [       weather image      ] |
| High / low     21° / 14°     |
| Humidity       58%           |
| Wind           12 km/h NW    |
| Visibility     10 km         |
+------------------------------+
| 5-day forecast               |
| [ Today ] [ Tuesday ]        |
| [ Wednesday ] [ Thursday ]   |
| [ Friday ]                   |
+------------------------------+
| mnjweather                   |
| Instagram  X  Facebook       |
+------------------------------+
```

## APIs And External Resources

The app runs entirely in the browser and uses the following browser-loaded resources:

- [Open-Meteo Geocoding API](https://geocoding-api.open-meteo.com/v1/search) to find a city and its coordinates.
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs) to retrieve current weather and five daily forecasts.
- [Bootstrap 5.3.3](https://getbootstrap.com/) from jsDelivr.
- [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/) from jsDelivr.
- Weather images from [Unsplash](https://unsplash.com/).

Open-Meteo does not require an API key for this project. An internet connection is required for weather data, Bootstrap, icons, and images.

## How It Works

1. The page starts with New York selected.
2. `app.js` sends the search term to the Open-Meteo geocoding endpoint.
3. The selected city coordinates are sent to the forecast endpoint.
4. Current conditions and daily forecast data replace the placeholder values in `index.html`.
5. The WMO weather code selects the matching description, icon, and Unsplash image.

## Use Cases

### Search For A City

- **Actor:** Visitor
- **Goal:** Find weather information for a city anywhere in the world.
- **Flow:** Enter a city name in the search field and select **Search**.
- **Result:** The app resolves the city and displays its current weather and forecast.

### Check Current Conditions

- **Actor:** Traveler or resident
- **Goal:** Decide what conditions are like right now.
- **Flow:** Review the temperature, feels-like temperature, condition, humidity, wind, and visibility.
- **Result:** The current weather panel provides the information needed for a quick decision.

### Review The Forecast

- **Actor:** Planner
- **Goal:** Understand how weather may change over the next few days.
- **Flow:** Read the five-day forecast cards below the current conditions.
- **Result:** Daily weather descriptions and high/low temperatures are shown for the selected city.

### Follow The App On Social Media

- **Actor:** Visitor
- **Goal:** Find the app’s social media profiles.
- **Flow:** Select the Instagram, X, or Facebook icon in the footer.
- **Result:** The selected profile opens in a new browser tab.

## Customization

- Update the social profile URLs in `index.html` before publishing.
- Change the default city by editing the value of `#city-search`.
- Add or replace weather images in the `weatherImages` object in `app.js`.
- Adjust colors, spacing, and responsive behavior in `styles.css`.

## Current Limitations

- The app searches one city at a time; it does not automatically load every major city.
- Social links currently point to platform homepages and needs updating.
- Weather image URLs are hosted by Unsplash and are not stored locally.
- There is no backend, caching, saved location list, unit toggle, or automated test suite yet.
