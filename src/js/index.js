import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './refs.js';
import { fetchCountries } from './fetchCountries';
import { createCardMarkup } from './createCardMarkup.js';
import { createListMarkup } from './createListMarkup.js';
import { clearContent } from './clearContent.js';
import '../css/styles.css';

const { inputEl, listEl, infoEl } = refs;

const DEBOUNCE_DELAY = 300;
const INFO_TEXT = 'Too many matches found. Please enter a more specific name.';
const ERROR_TEXT = 'Oops, there is no country with that name';

const options = {
  fontSize: '14px',
  cssAnimationDuration: 500,
  cssAnimationStyle: 'zoom',
};

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
listEl.addEventListener('click', onLink);

function onInputChange({ target: { value } }) {
  if (value.trim().length === 0) {
    clearContent(listEl, infoEl);
    return console.log('empty query');
  }

  fetchCountries(value.trim())
    .then(handleData)
    .catch(_err => Notify.failure(ERROR_TEXT, options));
}

function handleData(data) {
  console.log('responce:', data);

  if (data.status === 404) {
    clearContent(listEl, infoEl);
    throw new Error('No data');
  }

  if (data.length > 10) {
    clearContent(listEl, infoEl);
    return Notify.info(INFO_TEXT, options);
  }

  if (data.length <= 10 && data.length > 1) {
    clearContent(infoEl);
    return createList(data);
  }

  if (data.length === 1) {
    clearContent(listEl);
    return createCard(data[0]);
  }
}

function createList(countries) {
  const listMarkup = createListMarkup(countries);
  listEl.innerHTML = listMarkup;
}

function createCard(country) {
  const cardMarkup = createCardMarkup(country);
  infoEl.innerHTML = cardMarkup;
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
