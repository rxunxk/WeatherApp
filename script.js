//Elements
const input = document.querySelector(".weather-input");
const search = document.querySelector(".search-btn");
const temp = document.querySelector(".weather-temp");
const city = document.querySelector(".weather-city");
const humidity = document.querySelector(".humid");
const wind = document.querySelector(".wind");
const KEY = "5de48f906aac30774753e4c272a5c90f";

//functions
const handleSearch = () => {
  if (input.value.length === 0) {
    input.style.backgroundColor = "#FFD1DC";
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        temp.innerText = Math.ceil(data.main.temp) + "°c";
        city.innerText = data.name;
        humidity.innerText = data.main.humidity + " %";
        wind.innerText = data.wind.speed + " km/h";
      })
      .catch((error) => {
        if (error.message === "404") {
          window.alert("City Not Found!!");
        } else {
          window.alert("An Unknown error occured");
          // Handle other errors
        }
      });
  }

  input.value = "";
};

const handleInput = (e) => {
  if (e.key === "Enter") {
    handleSearch();
  } else if (input.value.length >= 0) {
    input.style.backgroundColor = "WHITE";
  }
};

//Listeners
search.addEventListener("click", handleSearch);
input.addEventListener("keypress", handleInput);
input.addEventListener("click", () => {
  input.value = "";
});
