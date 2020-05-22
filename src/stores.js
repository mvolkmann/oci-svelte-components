import set from 'lodash-es/set';
import {writable} from 'svelte/store';

function persist(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key, initialValue) {
  const sessionValue = JSON.parse(sessionStorage.getItem(key));
  if (!sessionValue) persist(key, initialValue);

  const store = writable(sessionValue || initialValue);
  store.subscribe(value => persist(key, value));
  return store;
}

export const globalStore = writableSession('global', {});

export function update(store, path, value, dispatch) {
  //console.log('stores.js update: setting', path, 'to', value);
  if (path)
    store.update(obj => {
      set(obj, path, value);
      //console.log('stores.js update: obj =', obj);
      return obj;
    });
  if (dispatch) dispatch('value', value);
}
