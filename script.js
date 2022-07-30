"use strict";

const cityDesc = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const img = document.querySelector(".icon");
const desc = document.querySelector(".description");
const wind = document.querySelector(".wind");
const humid = document.querySelector(".humidity");
const searchBtn = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");

const key = "9f6acd100d788e3f987c833cef3f27c7";

const getWeather = async function (cityName) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=metric&appid=" +
        API_KEY
    );
    const data = await response.json();
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityDesc.innerHTML = "Weather in " + name;
    img.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    temperature.innerHTML = temp + " °C";
    desc.innerHTML = description;
    humid.innerHTML = "Humidity: " + humidity + "%";
    wind.innerHTML = "Wind speed: " + speed + " km/hr";
    searchBar.value = "";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + ")";
  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener("click", function () {
  const city = document.querySelector(".search-bar").value;
  getWeather(city);
});

searchBar.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const city = document.querySelector(".search-bar").value;
    getWeather(city);
  }
});

getWeather("mumbai");
