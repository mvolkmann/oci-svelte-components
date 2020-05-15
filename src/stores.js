import {get as getStore, writable} from 'svelte/store';
import get from 'lodash/get';
import set from 'lodash/set';

export const globalStore = writable({});

export function getState(path, defaultValue = undefined) {
  return get(getStore(globalStore), path, defaultValue);
}

export function setState(path, value) {
  globalStore.update(obj => set(obj, path, value));
}
