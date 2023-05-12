const URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${URL}${name}?${fields}`).then(res => res.json());
}

export { fetchCountries };
