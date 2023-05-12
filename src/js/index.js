import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import '../css/styles.css';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
const INFO_TEXT = 'Too many matches found. Please enter a more specific name.';
const ERROR_TEXT = 'Oops, there is no country with that name';

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange({ target: { value } }) {
  if (value.trim().length === 0) {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
    return console.log('empty query');
  }

  fetchCountries(value.trim())
    .then(data => {
      if (data.status === 404) throw new Error('No data');
      if (data.length > 10) return Notify.info(INFO_TEXT);

      if (data.length === 1) return createCard(data[0]);
      createList(data);

      // console.log(data);
      // return 'markup';
    })
    // .then(renderMarkup)
    .catch(_err => {
      // console.error(err);
      return Notify.failure(ERROR_TEXT);
    });
}

function createList(countries) {
  console.log(countries);
  const listMarkup = createListMarkup(countries);
  infoEl.innerHTML = '';
  listEl.innerHTML = listMarkup;
}

function createCard(country) {
  console.log(country);
  const cardMarkup = createCardMarkup(country);
  listEl.innerHTML = '';
  infoEl.innerHTML = cardMarkup;
}

function createCardMarkup(country) {
  const { capital, population, name, languages, flags } = country;
  const languageList = Object.values(languages);
  return `<h2 class="country__name">
            <img
              class="country__flag"
              width='35'
              src=${flags.svg}
              alt=${flags.alt}
            >
            ${name.official}
          </h2>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languageList.join(', ')}</p>`;
}

function createListMarkup(countries) {
  console.log(countries);
  //
}
