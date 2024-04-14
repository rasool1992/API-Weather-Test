const cityForm = document.querySelector(".location");
const card = document.querySelector(".card");
const API_KEY = "953677dccfcd4b14b3a185020240604";
const API_Location = "a4afd0a4a7b94fce8597fa434f098d76";
async function getWeather(id) {
  const BASE_URL = `https://api.weatherapi.com/v1/current.json`;
  let query = `?key=${API_KEY}&q=id:${id}`;
  let response = await fetch(`${BASE_URL}${query}`);
  let data = await response.json();
  return data.current;
}

async function getCity(city) {
  const BASE_URL = `https://api.weatherapi.com/v1/search.json`;
  let query = `?key=${API_KEY}&q=${city}`;

  let response = await fetch(`${BASE_URL}${query}`);

  let data = await response.json();
  return data[0];
}

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
  if (city.length > 0) {
    getData(city)
      .then(function (data) {
        updateUI(data);
      })
      .catch(function (err) {});
  } else {
    card.classList.add("d-none");
  }
});

async function getLocation() {
  const BASE_URL = `https://api.ipgeolocation.io/ipgeo`;
  let query = `?apiKey=${API_Location}`;
  let response = await fetch(BASE_URL + query);
  let data = await response.json();
  return data;
}

window.addEventListener("load", function (e) {
  getLocation().then(function (data) {
    let cityFromGEO = data.city;

    getData(cityFromGEO)
      .then(function (data) {
        let { cityWeather, cityDetails } = data;
        updateUI(data);
      })
      .catch(function (err) {});
  });
});
