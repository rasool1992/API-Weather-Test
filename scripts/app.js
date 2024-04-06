const cityForm = document.querySelector(".location");
const card = document.querySelector(".card");

const API_KEY = "953677dccfcd4b14b3a185020240604";

async function getWeather(id) {
  const BASE_URL = `http://api.weatherapi.com/v1/current.json`;
  let query = `?key=${API_KEY}&q=id:${id}`;
  let response = await fetch(`${BASE_URL}${query}`);
  let data = await response.json();
  return data.current;
}

async function getCity(city) {
  const BASE_URL = `http://api.weatherapi.com/v1/search.json`;
  let query = `?key=${API_KEY}&q=${city}`;

  let response = await fetch(`${BASE_URL}${query}`);
  let data = await response.json();
  return data[0];
}
getCity("baghdad")
  .then(function (data) {
    return getWeather(data.id);
  })
  .catch(function (err) {});

async function updateUI(data) {
  let { cityDetails, cityWeather } = data;
  let htmlContent = `
        <div class="card-body">
        <h5 class="card-title">${cityDetails.name}</h5>
        <p class="text-muted">${cityWeather.temp_c}&deg; C</p>
        <p class="text-muted">${cityWeather.condition.text}</p>
        </div>
    `;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  cityForm.nextElementSibling.innerHTML = htmlContent;
}

async function getData(city) {
  let cityDetails = await getCity(city);
  let cityWeather = await getWeather(cityDetails.id);
  return { cityDetails, cityWeather }; //object shorthand notation when the key and value are the same you just write the key and automatically it also the value
}

cityForm.addEventListener("input", function (e) {
  e.preventDefault();
  let city = e.target.value;
  getData(city)
    .then(function (data) {
      updateUI(data);
    })
    .catch(function (err) {});
});
