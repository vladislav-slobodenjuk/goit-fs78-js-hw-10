const URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${URL}${name}?${fields}`).then(res => {
    if (res.status === 404) throw new Error('No data');
    return res.json();
  });
}

export { fetchCountries };
