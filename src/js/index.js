import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import '../css/styles.css';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infotEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
const INFO_TEXT = 'Too many matches found. Please enter a more specific name.';
const ERROR_TEXT = 'Oops, there is no country with that name';

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange({ target: { value } }) {
  if (value.trim().length === 0) {
    listEl.innerHTML = '';
    infotEl.innerHTML = '';
    return console.log('empty query');
  }

  fetchCountries(value.trim())
    .then(data => {
      if (data.status === 404) throw new Error('No data');
      if (data.length > 10) return Notify.info(INFO_TEXT);

      console.log(data);
      return 'markup';
    })
    // .then(renderMarkup)
    .catch(_err => {
      // console.error(err);
      return Notify.failure(ERROR_TEXT);
    });
}

function createList(counries) {
  //
}

function crateCard(country) {
  //
}

function renderMarkup(markup) {
  //
}
