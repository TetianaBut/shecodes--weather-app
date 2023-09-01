// input now  Date
function displaytDate() {
  let nowDate = new Date();
  // console.log(nowDate);
  let hours = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  let day = nowDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]}  ${hours}:${minutes}`;
}

// set Unit Temperature
function setUnitTemperature(event) {
  event.preventDefault();
  if (unit === "metric") {
    currentTemp = (currentTemp * 9) / 5 + 32;
    document.querySelector("#units").innerHTML = "°F";
    currentWind = currentWind * 0.621371;
    unitWind = "miles/h";
    unit = "imperial";
  } else {
    currentTemp = ((currentTemp - 32) * 5) / 9;
    document.querySelector("#units").innerHTML = `°C`;
    currentWind = currentWind * 1.60934;
    unitWind = "km/h";
    unit = "metric";
  }
  document.querySelector("#setTempValue").innerHTML = `${Math.round(
    currentTemp
  )}`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    currentWind
  )}${unitWind}`;
}

// set Unit Temperature
function displayWeatherCondition(response) {
  //   console.log(response.data);
  let displayCity = document.querySelector("h1");
  let displayDate = document.querySelector("#input-time");
  let displayIcons = document.querySelector("#weather-icon");
  let displayTemp = document.querySelector("#setTempValue");
  let displayDescript = document.querySelector("#description");
  let displayClouds = document.querySelector("#clouds");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  displayCity.innerHTML = `${response.data.name} ${response.data.sys.country}`;
  displayDate.innerHTML = displaytDate();
  displayDescript.innerHTML = `${response.data.weather[0].description}`;
  displayIcons.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayIcons.setAttribute("alt", `${response.data.weather[0].description}`);
  currentTemp = response.data.main.temp;
  displayTemp.innerHTML = `${Math.round(currentTemp)}`;
  displayClouds.innerHTML = ` ${response.data.clouds.all}`;
  displayHumidity.innerHTML = ` ${response.data.main.humidity}`;
  currentWind = response.data.wind.speed;
  if (unit === "metric") {
    currentWind = currentWind * 3.6;
  }
  displayWind.innerHTML = ` ${Math.round(currentWind)}${unitWind}`;
}

function retrieveDataWeather(cityName) {
  let apiKey = "36eeef5b0cb8b4f4de85392d5b87261c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// search  City  Name
function searchCityName(event) {
  event.preventDefault();
  let inputCityName = document.querySelector("#city-input").value;
  //   console.log(`q=${inputCityName}`);
  retrieveDataWeather(`q=${inputCityName}`);
}

// current City Name
function currentLocation(event) {
  function retrievePosition(position) {
    let positionCityName = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    retrieveDataWeather(positionCityName);
  }
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// start
let currentTemp = 0;
let currentWind = 0;
let unitWind = "km/h";
let unit = "metric";
retrieveDataWeather("q=kyiv");
// search City Name
let cityInput = document.querySelector("#form-input");
cityInput.addEventListener("submit", searchCityName);
// current City Name
let currentCity = document.querySelector("#current-location-button");
currentCity.addEventListener("click", currentLocation);
// favorite navigator
function nameCityKyiv(event) {
  event.preventDefault();
  retrieveDataWeather(`q=${document.querySelector("#kyiv").textContent}`);
}
function nameCityParis(event) {
  event.preventDefault();
  retrieveDataWeather(`q=${document.querySelector("#paris").textContent}`);
}
function nameCityBrno(event) {
  event.preventDefault();
  retrieveDataWeather(`q=${document.querySelector("#brno").textContent}`);
}
function nameCityNewYork(event) {
  event.preventDefault();
  retrieveDataWeather(`q=${document.querySelector("#newYork").textContent}`);
}
document.querySelector("#kyiv").addEventListener("click", nameCityKyiv);
document.querySelector("#paris").addEventListener("click", nameCityParis);
document.querySelector("#brno").addEventListener("click", nameCityBrno);
document.querySelector("#newYork").addEventListener("click", nameCityNewYork);
// set Unit Temperature
let setTempValue = document.querySelector("#units");
setTempValue.addEventListener("click", setUnitTemperature);
