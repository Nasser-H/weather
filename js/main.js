var navLink = document.querySelectorAll(`.navbar-nav .nav-link`);
for (var i = 0; i < navLink.length; i++) {
  if (!navLink[i].classList.contains("active")) {
    navLink[i].addEventListener("mouseenter", function (e) {
      e.target.classList.add("active");
    });
    navLink[i].addEventListener("mouseout", function (e) {
      e.target.classList.remove("active");
    });
  }
}
var searchLocation = document.getElementById("searchLocation");
var currentDayName = document.getElementById("currentDayName");
var currentDay = document.getElementById("currentDay");
var weatherLocation = document.getElementById("weatherLocation");
var currentWeatherDgree = document.getElementById("currentWeatherDgree");
var currentWeatherImage = document.getElementById("currentWeatherImage");
var currentWeatherText = document.getElementById("currentWeatherText");
var tomorrowDayName = document.getElementById("tomorrowDayName");
var tomorrowWeatherIcon = document.getElementById("tomorrowWeatherIcon");
var tomorrowWeatherMaxDgree = document.getElementById(
  "tomorrowWeatherMaxDgree"
);
var tomorrowWeatherMinDgree = document.getElementById(
  "tomorrowWeatherMinDgree"
);
var tomorrowWeatherText = document.getElementById("tomorrowWeatherText");
var AfterTomorrowDayName = document.getElementById("AfterTomorrowDayName");
var AfterTomorrowWeatherIcon = document.getElementById(
  "AfterTomorrowWeatherIcon"
);
var AfterTomorrowWeatherMaxDgree = document.getElementById(
  "AfterTomorrowWeatherMaxDgree"
);
var AfterTomorrowWeatherMinDgree = document.getElementById(
  "AfterTomorrowWeatherMinDgree"
);
var AfterTomorrowWeatherText = document.getElementById(
  "AfterTomorrowWeatherText"
);
var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

searchLocation.addEventListener("input", async function (e) {
  search = e.target.value;
  await getDataWeather(search);
});

async function getDataWeather(search) {
  if (search) {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e96c6a0ed3224d5f95c10109240112&q=${search}&days=3`
    );
  } else {
    var coordinates = await getGeolocation();
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e96c6a0ed3224d5f95c10109240112&q=${coordinates.latitude},${coordinates.longitude}&days=3`
    );
  }
  var weatherData = await response.json();
  return weatherData;
}

async function getDate(i) {
  var dayInfo = await getDataWeather();
  var d = new Date(dayInfo.forecast.forecastday[i].date);
  var dayName = dayNames[d.getDay()];
  var dayAndMonth = d.getDay() + 1 + " " + monthNames[d.getMonth()];
  var dayNameAnddayAndMonth = {
    dayName: dayName,
    dayAndMonth: dayAndMonth,
  };
  return dayNameAnddayAndMonth;
}

async function getWeatherLocation() {
  var WeatherData = await getDataWeather();
  var location = WeatherData.location.name;
  return location;
}
function getGeolocation() {
  return new Promise(function (resolved, rejected) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolved(coordinates);
      },
      function (error) {
        rejected(error.message);
      }
    );
  });
}

async function displayGeolocation() {
  try {
    var coordinates = await getGeolocation();
    console.log(coordinates);
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherInfo() {
  var WeatherDgree = await getDataWeather();

  wethetInfo = {
    weatherCurrent: {
      text: WeatherDgree.current.condition.text,
      icon: "https:" + WeatherDgree.current.condition.icon,
      weatherDgree: WeatherDgree.current.feelslike_c,
    },
    weathertomorrow: {
      weatherDgreeMax: WeatherDgree.forecast.forecastday[1].day.maxtemp_c,
      weatherDgreeMin: WeatherDgree.forecast.forecastday[1].day.mintemp_c,
      text: WeatherDgree.forecast.forecastday[1].day.condition.text,
      icon: "https:" + WeatherDgree.forecast.forecastday[1].day.condition.icon,
    },
    weatherAfterTomorrow: {
      weatherDgreeMax: WeatherDgree.forecast.forecastday[2].day.maxtemp_c,
      weatherDgreeMin: WeatherDgree.forecast.forecastday[2].day.mintemp_c,
      text: WeatherDgree.forecast.forecastday[2].day.condition.text,
      icon: "https:" + WeatherDgree.forecast.forecastday[2].day.condition.icon,
    },
  };

  return wethetInfo;
}

async function displaycurrentWeather() {
  var data = await getDate(0);
  var location = await getWeatherLocation();
  var weatherInfo = await getWeatherInfo();
  weatherLocation.innerHTML = location;
  currentDayName.innerHTML = data.dayName;
  currentDay.innerHTML = data.dayAndMonth;
  currentWeatherDgree.innerHTML = weatherInfo.weatherCurrent.weatherDgree;
  currentWeatherImage.src = weatherInfo.weatherCurrent.icon;
  currentWeatherText.innerHTML = weatherInfo.weatherCurrent.text;
}

async function displaytomorrowWeather() {
  var data = await getDate(1);
  var weatherInfo = await getWeatherInfo();
  tomorrowDayName.innerHTML = data.dayName;
  tomorrowWeatherIcon.src = weatherInfo.weathertomorrow.icon;
  tomorrowWeatherMaxDgree.innerHTML =
    weatherInfo.weathertomorrow.weatherDgreeMax;
  tomorrowWeatherMinDgree.innerHTML =
    weatherInfo.weathertomorrow.weatherDgreeMin;
  tomorrowWeatherText.innerHTML = weatherInfo.weathertomorrow.text;
}

async function displayAfterTomorrowWeather() {
  var data = await getDate(2);
  var weatherInfo = await getWeatherInfo();
  AfterTomorrowDayName.innerHTML = data.dayName;
  AfterTomorrowWeatherIcon.src = weatherInfo.weatherAfterTomorrow.icon;
  AfterTomorrowWeatherMaxDgree.innerHTML =
    weatherInfo.weatherAfterTomorrow.weatherDgreeMax;
  AfterTomorrowWeatherMinDgree.innerHTML =
    weatherInfo.weatherAfterTomorrow.weatherDgreeMin;
  AfterTomorrowWeatherText.innerHTML = weatherInfo.weatherAfterTomorrow.text;
}

displaycurrentWeather();
displaytomorrowWeather();
displayAfterTomorrowWeather();
