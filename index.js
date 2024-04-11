const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');

let countries = [];

const clima = async () => {
  try {
    const climato = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74c2a8f9872ea2e46f48453a09a41371&units=metric);')
  } catch (error) {
    console.log(error);
  }
}

clima ()

const getCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response) {
      countries = await response.json();
    } else {
      console.error('Error al obtener los países:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
getCountries();

searchInput.addEventListener('input', async (e) => {
  const filtered = countries.filter((country) => {
    return country.name.common.toLowerCase().startsWith(searchInput.value.toLowerCase());
  });
  if (filtered.length === 1) {
    renderCountry(filtered[0]);
  } else if (filtered.length > 10) {
    container.innerHTML = '<p>No se encuentran coincidencias</p>';
  } else {
    renderCountries(filtered);
  }
});

function renderCountries(countries) {
  container.innerHTML = '';
  countries.forEach((country) => {
    const li = document.createElement('li');
    li.classList.add('country-item');
    li.innerHTML = `
        <div class="solo">
          <img src="${country.flags.png}" alt="" class="imagen">
          <p>${country.name.common}</p>
        </div>
    `;
    container.appendChild(li);
  });
}

function renderCountry(country) {
  container.innerHTML = `
      <div class="solo">
        <img src="${country.flags.png}" alt="" class="imagen">
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Poblacion: ${country.population}</p>
        <p>Region: ${country.region || 'Not available'}</p>
        <p>Subregion: ${country.subregion || 'Not available'}</p>
        <p>Language: ${Object.values(country.languages).join(', ') || 'Not available'}</p>
      </div>

  `;
}
