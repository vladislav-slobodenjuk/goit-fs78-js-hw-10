export function clearContent(...params) {
  params.forEach(elem => (elem.innerHTML = ''));
}
