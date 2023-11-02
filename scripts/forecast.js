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
            const tomorrowButton = document.getElementById('tomorrow');
            tomorrowButton.addEventListener('click', function() {
                const tomorrowDate = getTodayDate();
                searchWeather(locationString, tomorrowDate);
            });

            const twoDaysButton = document.getElementById('2days');
            twoDaysButton.addEventListener('click', function() {
                const twoDaysDate = getTomorrowDate();
                searchWeather(locationString, twoDaysDate);
            });

            const threeDaysButton = document.getElementById('3days');
            threeDaysButton.addEventListener('click', function() {
                const threeDaysDate = getTheDateAfterTomorrowDate();
                searchWeather(locationString, threeDaysDate);
            });

            const tomorrowDate = getTodayDate();
            searchWeather(locationString, tomorrowDate);
        }
    });
});


document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        const locationInput = document.getElementById('locationInput');
        let location = locationInput.value.trim();
        const tomorrowDate = getTodayDate();
        searchWeather(location, tomorrowDate);
    }
});


function searchWeather(locationString, date) {
    const locationInput = document.getElementById('locationInput');
    let location = locationInput.value.trim();

    if (location.trim() === '') {
        location = locationString;
    }
    const apiKey = '1003cf71e24041cd81d165317230710';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentLocation = document.getElementById('current_location')
            const backGround = document.getElementById('background_header')
            const headerCurrent = document.getElementById('main-data')

            const forecastForDate = data.forecast.forecastday.find(item => item.date === date);

            // Присвойте значения элементам на странице, используя полученные данные
            if (forecastForDate) {
                const day = document.getElementById('day');
                const maxTemp = document.getElementById('max_temperature');
                const minTemp = document.getElementById('min_temperature');
                const averageTemperature = document.getElementById('average_temperature');
                const condition = document.getElementById('condition')
                const maxWindSpeed = document.getElementById('wind_speed');
                const precipitation = document.getElementById('precipitation');
                const humidity = document.getElementById('humidity');
                const visibility = document.getElementById('vis_km');
                const chanceOfRain = document.getElementById('chance_of_rain');
                const uv = document.getElementById('uv');
                const sunrise = document.getElementById('sunrise');
                const sunset = document.getElementById('sunset');
                const moonrise = document.getElementById('moonrise');
                const moonset = document.getElementById('moonset');

                day.textContent = date;
                maxTemp.textContent = forecastForDate.day.maxtemp_c + "°C";
                minTemp.textContent = forecastForDate.day.mintemp_c + "°C";
                averageTemperature.textContent = forecastForDate.day.avgtemp_c + "°C";
                condition.textContent = forecastForDate.day.condition.text;
                maxWindSpeed.textContent = forecastForDate.day.maxwind_kph + " km/h";
                precipitation.textContent = forecastForDate.day.totalprecip_mm + "mm";
                humidity.textContent = forecastForDate.day.avghumidity + "%";
                visibility.textContent = forecastForDate.day.avgvis_km + "km";
                chanceOfRain.textContent = forecastForDate.day.daily_chance_of_rain + "%";
                uv.textContent = forecastForDate.day.uv;
                sunrise.textContent = forecastForDate.astro.sunrise;
                sunset.textContent = forecastForDate.astro.sunset;
                moonrise.textContent = forecastForDate.astro.moonrise;
                moonset.textContent = forecastForDate.astro.moonset;
            } else {
                console.error('Data for the selected date not found.');
            }
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

            const weatherClass = weatherClassMapping[forecastForDate.day.condition.text];

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

            const HeaderClass = HeaderMapping[forecastForDate.day.condition.text];

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

function getLocalDay(){

}
function getFutureDate(daysToAdd) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTodayDate() {
    return getFutureDate(0);
}

function getTomorrowDate() {
    return getFutureDate(1);
}

function getTheDateAfterTomorrowDate() {
    return getFutureDate(2);
}

module.exports = { getTodayDate, getTomorrowDate, getTheDateAfterTomorrowDate}