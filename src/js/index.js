import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import '../css/styles.css';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infotEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange({ target: { value } }) {
  if (value.trim().length === 0) return console.log('empty');

  fetchCountries(value.trim())
    .then(data => {
      // Data handling
      // if (data.status === 404) throw new Error('No data');

      console.log(data);
      return 'markup';
    })
    .then(renderMarkup)
    .catch(err => {
      console.error(err);
      // Error handling
    });
}

function renderMarkup(markup) {
  //
}
