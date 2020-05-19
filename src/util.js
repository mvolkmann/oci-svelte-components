const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let lastId = 0;

export function formatCurrency(
  amount,
  languageCode = 'en-US',
  currencyCode = 'USD'
) {
  return getCurrencyFormatter(languageCode, currencyCode).format(amount);
}

export function formatDate(date) {
  if (!date) return '';
  if (typeof date === 'string') return date;

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  const monthName = MONTHS[date.getMonth()];
  return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDate2(date) {
  if (!date) return '';
  if (typeof date === 'string') return date;

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

export function formatNumber(amount) {
  return getNumberFormatter().format(amount);
}

export function getContent(contentMap, languageCode, contentId) {
  let languageMap = contentMap[languageCode];

  // If we don't find a match for a full language code (ex. en-US),
  // try to find a match for the first part (ex. en).
  if (!languageMap && languageCode.includes('-')) {
    const index = languageCode.indexOf('-');
    const firstPart = languageCode.substring(0, index);
    languageMap = contentMap[firstPart];
  }

  if (!languageMap) {
    throw new Error('failed to get language translations for ' + languageCode);
  }

  const content = languageMap[String(contentId)];
  return content;
}

export function getCurrencyFormatter(
  languageCode = 'en-US',
  currencyCode = 'USD'
) {
  return new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: currencyCode
  });
}

export function getId(prefix = '') {
  lastId++;
  return prefix + lastId;
}

export function getNumberFormatter() {
  return new Intl.NumberFormat();
}

export function goHome() {
  const {href} = window.location;
  const index = indexOfNth(href, '/', 4);
  window.location.href = href.substring(0, index);
}

export function getStyleString(styleObj) {
  return Object.entries(styleObj)
    .map(([key, value]) => key + ': ' + value)
    .join('; ');
}

export function indexOfNth(str, substring, n) {
  let index;
  let times = 0;

  while (times < n && index !== -1) {
    const fromIndex = index === undefined ? 0 : index + 1;
    index = str.indexOf(substring, fromIndex);
    times++;
  }

  return index;
}

export function isMobileView(width) {
  const docStyle = window.getComputedStyle(document.documentElement);
  const bsm = docStyle.getPropertyValue('--breakpoint-sm');
  const mobileSize = parseInt(bsm, 10);
  return width <= mobileSize;
}

export function logCssVar(label, element, name) {
  const value = getComputedStyle(element).getPropertyValue(name);
  console.log(label, 'CSS variable', name, '=', value);
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function stringsToSentence(strings) {
  const {length} = strings;
  return length === 0
    ? ''
    : length === 1
    ? strings[0]
    : length === 2
    ? strings[0] + ' and ' + strings[1]
    : strings.slice(0, length - 1).join(', ') + ', and ' + strings[length - 1];
}
