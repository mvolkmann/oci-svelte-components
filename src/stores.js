import set from 'lodash-es/set';
import {writable} from 'svelte/store';

export const globalStore = writable({});

export function update(store, path, value, dispatch) {
  if (path) store.update(obj => set(obj, path, value));
  if (dispatch) dispatch('value', value);
}
