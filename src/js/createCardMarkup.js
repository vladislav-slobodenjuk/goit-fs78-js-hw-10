export function createCardMarkup(country) {
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
