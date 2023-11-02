function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationString = latitude + ',' + longitude; // Объединяем в строку
            callback(locationString);
        });
    } else {
        console.error('Geolocation is not supported');
        callback(null);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getUserLocation(function(locationString) {
        if (locationString) {
            searchWeather(locationString);
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        searchWeather();
    }
});


function searchWeather(locationString) {
    const locationInput = document.getElementById('locationInput');
    let location = locationInput.value.trim();

    if (location.trim() === '') {
        location = locationString;
    }

    const apiKey = '1003cf71e24041cd81d165317230710';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperatureElement = document.getElementById('temperature');
            const conditionElement = document.getElementById('condition');
            const feelsLikeElement = document.getElementById('feels_like');
            const windDirectionElement = document.getElementById('wind_direction');
            const windSpeedElement = document.getElementById('wind_speed');
            const currentTimeElement = document.getElementById('currentTime');
            const winGustsElement = document.getElementById('wind_gusts');
            const currentLocation = document.getElementById('current_location')
            const backGround = document.getElementById('background_header')
            const headerCurrent = document.getElementById('main-data')

            var time = data.location.localtime.split(' ');

            currentTimeElement.textContent = time[1];
            temperatureElement.textContent = data.current.temp_c;
            conditionElement.textContent = data.current.condition.text;
            feelsLikeElement.textContent = data.current.feelslike_c;
            windDirectionElement.textContent = data.current.wind_dir;
            windSpeedElement.textContent = data.current.wind_kph;
            winGustsElement.textContent = data.current.gust_kph;
            currentLocation.textContent = data.location.name + ", " + data.location.country;
            document.getElementById('current_location').style.visibility = "visible";


            const weatherClassMapping = {
                'Sunny': 'weather_sunny',
                'Clear': 'weather_clear',
                'Partly cloudy': 'weather_partly_cloudy',
                'Cloudy': 'weather_cloudy',
                'Overcast': 'weather_overcast',
                'Mist': 'weather_mist',
                'Patchy rain possible': 'weather_patchy_rain_possible',
                'Patchy snow possible': 'weather_patchy_snow_possible',
                'Patchy sleet possible': 'weather_patchy_sleet_possible',
                'Patchy freezing drizzle possible': 'weather_patchy_freezing_drizzle_possible',
                'Thundery outbreaks possible': 'weather_thundery_outbreaks_possible',
                'Blowing snow': 'weather_blowing_snow',
                'Blizzard': 'weather_blizzard',
                'Fog': 'weather_mist',
                'Freezing fog': 'weather_mist',
                'Patchy light drizzle': 'weather_drizzle',
                'Light drizzle': 'weather_drizzle',
                'Freezing drizzle': 'weather_patchy_freezing_drizzle_possible',
                'Heavy freezing drizzle': 'weather_patchy_freezing_drizzle_possible',
                'Patchy light rain': 'weather_light_rain',
                'Light rain': 'weather_light_rain',
                'Moderate rain at times': 'weather_moderate_rain',
                'Moderate rain': 'weather_moderate_rain',
                'Heavy rain at times': 'weather_heavy_rain',
                'Heavy rain': 'weather_heavy_rain',
                'Light freezing rain': 'weather_patchy_freezing_drizzle_possible',
                'Moderate or heavy freezing rain': 'weather_patchy_freezing_drizzle_possible',
                'Light sleet': 'weather_patchy_sleet_possible',
                'Moderate or heavy sleet': 'weather_patchy_sleet_possible',
                'Patchy light snow': 'weather_patchy_snow_possible',
                'Light snow': 'weather_light_snow',
                'Patchy moderate snow': 'weather_light_snow',
                'Moderate snow': 'weather_light_snow',
                'Patchy heavy snow': 'weather_blizzard',
                'Heavy snow': 'weather_blizzard',
                'Ice pellets': 'weather_hail',
                'Light rain shower': 'weather_moderate_rain',
                'Moderate or heavy rain shower': 'weather_moderate_rain',
                'Torrential rain shower': 'weather_moderate_rain',
                'Light sleet showers': 'weather_patchy_sleet_possible',
                'Moderate or heavy sleet showers': 'weather_patchy_sleet_possible',
                'Light snow showers': 'weather_snow_shower',
                'Moderate or heavy snow showers': 'weather_snow_shower',
                'Light showers of ice pellets': 'weather_hail',
                'Moderate or heavy showers of ice pellets': 'weather_hail',
                'Patchy light rain with thunder': 'weather_thundery_outbreaks_possible',
                'Moderate or heavy rain with thunder': 'weather_thundery_outbreaks_possible',
                'Patchy light snow with thunder': 'weather_thundery_outbreaks_possible',
                'Moderate or heavy snow with thunder': 'weather_thundery_outbreaks_possible'
            };

            const weatherClass = weatherClassMapping[data.current.condition.text];

            if (weatherClass) {
                // Remove existing weather classes
                backGround.classList.remove(
                    'weather_sunny',
                    'weather_clear',
                    'weather_partly_cloudy',
                    'weather_cloudy',
                    'weather_overcast',
                    'weather_mist',
                    'weather_patchy_rain_possible',
                    'weather_patchy_snow_possible',
                    'weather_patchy_sleet_possible',
                    'weather_patchy_freezing_drizzle_possible',
                    'weather_thundery_outbreaks_possible',
                    'weather_blowing_snow',
                    'weather_blizzard',
                    'weather_drizzle',
                    'weather_light_rain',
                    'weather_moderate_rain',
                    'weather_heavy_rain',
                    'weather_light_snow',
                    'weather_snow_shower',
                    'weather_hail',

                );
                backGround.classList.add(weatherClass);
            }
            if (weatherClass) {
                backGround.classList.add(weatherClass);
            }

            const HeaderMapping = {
                'Sunny': 'header_sunny',
                'Clear': 'header_clear',
                'Partly cloudy': 'header_partly_cloudy',
                'Cloudy': 'header_cloudy',
                'Overcast': 'header_overcast',
                'Mist': 'header_mist',
                'Patchy rain possible': 'header_patchy_rain_possible',
                'Patchy snow possible': 'header_patchy_snow_possible',
                'Patchy sleet possible': 'header_patchy_sleet_possible',
                'Patchy freezing drizzle possible': 'header_patchy_freezing_drizzle_possible',
                'Thundery outbreaks possible': 'header_thundery_outbreaks_possible',
                'Blowing snow': 'header_blowing_snow',
                'Blizzard': 'header_blizzard',
                'Fog': 'header_mist',
                'Freezing fog': 'header_mist',
                'Patchy light drizzle': 'header_drizzle',
                'Light drizzle': 'header_drizzle',
                'Freezing drizzle': 'header_patchy_freezing_drizzle_possible',
                'Heavy freezing drizzle': 'header_patchy_freezing_drizzle_possible',
                'Patchy light rain': 'header_light_rain',
                'Light rain': 'header_light_rain',
                'Moderate rain at times': 'header_moderate_rain',
                'Moderate rain': 'header_moderate_rain',
                'Heavy rain at times': 'header_heavy_rain',
                'Heavy rain': 'header_heavy_rain',
                'Light freezing rain': 'header_patchy_freezing_drizzle_possible',
                'Moderate or heavy freezing rain': 'header_patchy_freezing_drizzle_possible',
                'Light sleet': 'header_patchy_sleet_possible',
                'Moderate or heavy sleet': 'header_patchy_sleet_possible',
                'Patchy light snow': 'header_patchy_snow_possible',
                'Light snow': 'header_light_snow',
                'Patchy moderate snow': 'header_light_snow',
                'Moderate snow': 'header_light_snow',
                'Patchy heavy snow': 'header_blizzard',
                'Heavy snow': 'header_blizzard',
                'Ice pellets': 'header_hail',
                'Light rain shower': 'header_moderate_rain',
                'Moderate or heavy rain shower': 'header_moderate_rain',
                'Torrential rain shower': 'header_moderate_rain',
                'Light sleet showers': 'header_patchy_sleet_possible',
                'Moderate or heavy sleet showers': 'header_patchy_sleet_possible',
                'Light snow showers': 'header_snow_shower',
                'Moderate or heavy snow showers': 'header_snow_shower',
                'Light showers of ice pellets': 'header_hail',
                'Moderate or heavy showers of ice pellets': 'header_hail',
                'Patchy light rain with thunder': 'header_thundery_outbreaks_possible',
                'Moderate or heavy rain with thunder': 'header_thundery_outbreaks_possible',
                'Patchy light snow with thunder': 'header_thundery_outbreaks_possible',
                'Moderate or heavy snow with thunder': 'header_thundery_outbreaks_possible'
            };

            const HeaderClass = HeaderMapping[data.current.condition.text];

            if (HeaderClass) {
                // Remove existing weather classes
                headerCurrent.classList.remove(
                    'header_sunny',
                    'header_clear',
                    'header_partly_cloudy',
                    'header_cloudy',
                    'header_overcast',
                    'header_mist',
                    'header_patchy_rain_possible',
                    'header_patchy_snow_possible',
                    'header_patchy_sleet_possible',
                    'header_patchy_freezing_drizzle_possible',
                    'header_thundery_outbreaks_possible',
                    'header_blowing_snow',
                    'header_blizzard',
                    'header_drizzle',
                    'header_light_rain',
                    'header_moderate_rain',
                    'header_heavy_rain',
                    'header_light_snow',
                    'header_snow_shower',
                    'header_hail',

                );
                headerCurrent.classList.add(HeaderClass);
            }
            if (HeaderClass) {
                headerCurrent.classList.add(HeaderClass);
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}
