const cityForm = document.querySelector(".location");
const card = document.querySelector(".card");
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