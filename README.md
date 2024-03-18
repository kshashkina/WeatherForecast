# MyWeather App Documentation

Welcome to the MyWeather App documentation. MyWeather App is a web-based application designed to provide current weather information and forecasts for locations worldwide. It leverages the WeatherAPI for data and is built using HTML, CSS, JavaScript (with modules).

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Files Overview](#files-overview)
    - [HTML Files](#html-files)
    - [JavaScript Modules](#javascript-modules)
    - [CSS Stylesheets](#css-stylesheets)
- [Features](#features)
- [Usage](#usage)
    - [Searching for Weather](#searching-for-weather)
    - [Navigating the App](#navigating-the-app)
- [Contributing](#contributing)

## Project Structure

The MyWeather App consists of HTML files for the interface, JavaScript modules for dynamic content and API interaction, and CSS stylesheets for styling. Here is a brief overview:

- **HTML Files**: Serve as the entry points for different views (Home, Current Weather, Forecast).
- **JavaScript Modules**: Contain logic for fetching weather data and manipulating the DOM.
- **CSS Stylesheets**: Provide the styling for the application.

## Getting Started

### Prerequisites

- A modern web browser that supports ES6 modules and geolocation.
- Internet access to fetch weather data from WeatherAPI.

### Installation

This application does not require installation. Simply clone or download the repository and open the `index.html` file in a web browser.

## Files Overview

### HTML Files

- **index.html**: The homepage displays general weather information and provides navigation to other views.
- **current.html**: Shows detailed current weather information for a specified location.
- **forecast.html**: Displays a 3-day weather forecast for the chosen location.

### JavaScript Modules

- **home.mjs**: Handles the homepage's functionality, including fetching and displaying basic weather information.
- **current.mjs**: Manages fetching and displaying detailed current weather data.
- **forecast.js**: Responsible for fetching and presenting the weather forecast.

### CSS Stylesheets

- **main_page.css**: General styles that apply across the entire app.
- **headerChanger.css**: Defines styles for the header, including dynamic weather-related backgrounds.
- **currentText.css**: Specific styles for the text displayed in the current weather view.

## Features

- **Geolocation Support**: Automatically fetches weather for the user's current location upon visiting the homepage.
- **Search Functionality**: Users can search for weather information by city, zip code, or coordinates.
- **Dynamic Weather Updates**: The app dynamically updates weather information based on user interactions.
- **Responsive Design**: The app is designed to be responsive across various devices and screen sizes.

## Usage

### Searching for Weather

Enter a location (city name or zip code) in the search bar and press the "Search" button or Enter key to retrieve weather information for that location.

### Navigating the App

Use the navigation bar to switch between the Home view, Current Weather view, and Forecast view.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.
