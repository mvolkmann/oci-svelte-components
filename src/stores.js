import get from 'lodash-es/get';
import set from 'lodash-es/set';
import {get as getStore, writable} from 'svelte/store';

export const globalStore = writable({});

export function getState(path, defaultValue = undefined) {
  return get(getStore(globalStore), path, defaultValue);
}

export function setState(path, value) {
  globalStore.update(obj => set(obj, path, value));
}
