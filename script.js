const ApiKey = "7bf14fb660a1d10beeec5c4080f59816";


document.querySelector("#weatherform button").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    console.log("Button clicked!");
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name");
    }
});


function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
    fetch(apiUrl)
     .then(response => {
        if (!response.ok) {
            throw new Error(`The city you entered was not found or internet connection is lost`);
        }
        return response.json();
      })
      .then(data => displayWeather(data))
      .catch(error => displayError(error.message));
}

function displayWeather(data) {
    document.getElementById("errorDisplay").textContent = "";
    document.getElementById("cityDisplay").textContent = `Weather in ${data.name}`; // Changed from cityInput to cityDisplay
    document.getElementById("temperatureDisplay").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("weatherConditionDisplay").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidityDisplay").textContent = `Humidity: ${data.main.humidity}%`;
}


function displayError(message) {
    document.getElementById("errorDisplay").textContent = "The city you entered was not found";
}

