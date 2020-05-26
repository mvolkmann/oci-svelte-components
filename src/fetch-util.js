import {taskEnd, taskStart} from './Spinner.svelte';
import {goHome, sleep} from './util';

const URL_PREFIX = process.env.URL_PREFIX;

export async function deleteResource(urlSuffix) {
  const url = getUrl(urlSuffix);
  const res = await fetch(url, {...getOptions(), method: 'DELETE'});
  sessionEnded(res);
}

export async function getJson(urlSuffix) {
  taskStart();
  try {
    const url = getUrl(urlSuffix);
    const res = await fetch(url, getOptions());
    if (sessionEnded(res)) return {};

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } finally {
    taskEnd();
  }
}

function getOptions() {
  const options = {
    headers: {
      'Access-Control-Allow-Origin': URL_PREFIX,
      'Sec-Fetch-Mode': 'cors'
    }
  };

  const token = sessionStorage.getItem('authToken');
  if (token) options.headers['Authorization'] = 'Bearer ' + token;

  return options;
}

export function getQuery(obj) {
  return (
    '?' +
    Object.entries(obj)
      .map(([key, value]) => key + '=' + encodeURIComponent(value))
      .join('&')
  );
}

export async function getText(urlSuffix) {
  taskStart();
  try {
    const url = getUrl(urlSuffix);
    const res = await fetch(url, getOptions());
    if (sessionEnded(res)) return '';

    if (!res.ok) throw new Error(await res.text());
    return res.text();
  } finally {
    taskEnd();
  }
}

function getUrl(urlSuffix) {
  const prefix = urlSuffix.startsWith('http') ? '' : URL_PREFIX;
  return prefix + urlSuffix;
}

export function postJson(urlSuffix, obj, responseType) {
  return postPutJson('POST', urlSuffix, obj, responseType);
}

export function putJson(urlSuffix, obj) {
  return postPutJson('PUT', urlSuffix, obj);
}

async function postPutJson(method, urlSuffix, obj, responseType) {
  taskStart();
  try {
    const body = obj ? JSON.stringify(obj) : '';
    const options = getOptions();
    options.body = body;
    //options.credentials = 'include';
    options.method = method;

    options.headers = {
      ...options.headers,
      Accept: '*/*', // need this?
      'Accept-Encoding': 'gzip, deflate, br', // need this?
      Connection: 'keep-alive', // need this?
      'Content-Length': String(body.length),
      'Content-Type': 'application/json'
      //credentials: 'include'
    };

    //TODO: Artificial delay to test Spinner.
    //await sleep(2000);

    const url = getUrl(urlSuffix);
    const res = await fetch(url, options);

    // Some services return a 404 status when requested data is not found,
    // so it doesn't always mean the service was not found.
    // if (res.status === 404) {
    //   throw new Error(JSON.stringify({error: `No service found at ${url}.`}));
    // }

    if (sessionEnded(res)) return {};

    // We are not checking res.ok here because some callers
    // want to get an error message from the JSON response body.
    //if (!res.ok) throw new Error(await res.text());

    return responseType === 'text' ? res.text() : res.json();
  } finally {
    taskEnd();
  }
}

function sessionEnded(res) {
  const {redirected, status, url} = res;
  sessionStorage.setItem('lastHttpStatus', String(status));

  const expired = status === 401 || status === 403;
  if (expired) sessionStorage.removeItem('authToken');

  const end = expired || (redirected && url.endsWith('/login'));
  if (end) goHome();
  return end;
}

export const setToken = token => sessionStorage.setItem('authToken', token);
