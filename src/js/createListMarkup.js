export function createListMarkup(countries) {
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
