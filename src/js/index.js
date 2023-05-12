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
listEl.addEventListener('click', onLink);

function onInputChange({ target: { value } }) {
  if (value.trim().length === 0) {
    clearContent(listEl, infoEl);
    return console.log('empty query');
  }

  fetchCountries(value.trim())
    .then(handleData)
    .catch(_err => Notify.failure(ERROR_TEXT));
}

function handleData(data) {
  console.log('responce:', data);

  if (data.status === 404) {
    clearContent(listEl, infoEl);
    throw new Error('No data');
  }

  if (data.length > 10) {
    clearContent(listEl, infoEl);
    return Notify.info(INFO_TEXT);
  }

  if (data.length <= 10 && data.length > 1) {
    clearContent(infoEl);
    createList(data);
  }

  if (data.length === 1) {
    clearContent(listEl);
    return createCard(data[0]);
  }
}

function clearContent(...params) {
  params.forEach(elem => (elem.innerHTML = ''));
}

function createList(countries) {
  const listMarkup = createListMarkup(countries);
  listEl.innerHTML = listMarkup;
}

function createCard(country) {
  const cardMarkup = createCardMarkup(country);
  infoEl.innerHTML = cardMarkup;
}

function createCardMarkup(country) {
  const { capital, population, name, languages, flags } = country;
  const languageList = Object.values(languages).join(', ');
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
          <p>Languages: ${languageList}</p>`;
}

function createListMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country">
                <img
                  class="country__flag"
                  width='35'
                  src=${flags.svg}
                  alt=${flags.alt}
                >
                <a href='${flags.svg}'>${name.official}</a>
              </li>`;
    })
    .join('');
}

function onLink(e) {
  e.preventDefault();

  const country = e.target.textContent;
  inputEl.value = country;
  fetchCountries(country).then(data => {
    clearContent(listEl);
    createCard(data[0]);
  });
}
