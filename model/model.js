export function getWeather(location) {
    const apiKey = "116d8a3bf04b4d48a6c233406242209";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=yes`;

    $.getJSON(url, (data) => {
        displayCityName(data.location);
        displayCurrentWeather(data.current);
        displayForecast(data.forecast.forecastday);
    }).fail((error) => {
        console.log("Error", error.message);
        alert("Could not retrieve weather data. Please check your input.");
    });
}

function displayCityName(location) {
    $(".cityName").remove();
    const city = location.name;
    const state = location.region ? location.region : '';
    const country = location.country;


    const displayName = state ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
    $(".forecastHolder").before(`<h2 class="cityName">${displayName}</h2>`); 
}

function displayCurrentWeather(current) {
    $(".currentWeather").remove(); 

    $(".forecastHolder").before(`
        <div class="currentWeather">
            <h3>Current Weather</h3>
            <img src="${current.condition.icon}" alt="${current.condition.text}">
            <p>Temperature: ${current.temp_f}°F</p>
            <p>Condition: ${current.condition.text}</p>
            <p>Wind: ${current.wind_mph} mph ${current.wind_dir}</p>
            <p>Humidity: ${current.humidity}%</p>
            <p>Gust Speed: ${current.gust_mph} mph</p>
            <p>UV Index: ${current.uv}</p>
        </div>
    `);
}

function displayForecast(forecastDays) {
    $(".forecastHolder").html(""); 
    forecastDays.forEach(day => {
        $(".forecastHolder").append(`
            <div class="forecast">
                <h4>${day.date}</h4>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="imgIcon">
                <p>Condition: ${day.day.condition.text}</p>
                <p>Max Temp: ${day.day.maxtemp_f}°F</p>
                <p>Min Temp: ${day.day.mintemp_f}°F</p>
                <p>Max Wind: ${day.day.maxwind_mph} mph</p>
                <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
                <button class="toggleDetails">More Info</button>
                <div class="details" style="display: none;">
                    <p>Precipitation: ${day.day.totalprecip_in} inches</p>
                    <p>Sunrise: ${day.astro.sunrise}</p>
                    <p>Sunset: ${day.astro.sunset}</p>
                    <p>Moonrise: ${day.astro.moonrise}</p>
                    <p>Moonset: ${day.astro.moonset}</p>
                    <p>Moon Phase: ${day.astro.moon_phase}</p>
                </div>
            </div>
        `);
    });



    $(".toggleDetails").on("click", function () {
        $(this).next(".details").slideToggle();
    });
}
