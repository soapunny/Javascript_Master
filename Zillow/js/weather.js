const API_KEY = "4da30c7aaa9b293a0d2949b4b05b12e4";


const weatherInfo = document.querySelector("#weatherInfo");

function runOnSuccess(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    const weather = fetch(url).then(response => response.json()).then(data => {
        const location = `${data.name}, ${data.sys['country']}`;
        const temperature = `${data.main['temp_min'].toString()}'F / ${data.main['temp_max'].toString()}'F`;
        const humidity = `${data.main['humidity'].toString()}%`;
        const description = `${data.weather[0]['description']}`;
        weatherInfo.querySelector("#location").innerText = location;
        weatherInfo.querySelector("#temperature").innerText = temperature;
        weatherInfo.querySelector("#humidity").innerText = humidity;
        weatherInfo.querySelector("#description").innerText = description;
    });
}

function runOnFailure(){
    alert("I cannot find you!, allow your location.");
}

navigator.geolocation.getCurrentPosition(runOnSuccess, runOnFailure);