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
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {});
