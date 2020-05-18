<script>
  import get from 'lodash-es/get';
  import Labeled from './Labeled.svelte';
  import {globalStore} from './stores';

  export let className = '';
  export let formatter = undefined;
  export let label;
  export let path = undefined;
  export let store = undefined;
  export let vertical = false;

  if (path && !store) store = globalStore;

  let value = '';
  $: {
    value = get($store, path) || 0;
    if (formatter) value = formatter(value);
  }
</script>

<Labeled {className} {label} {vertical}>{value}</Labeled>
