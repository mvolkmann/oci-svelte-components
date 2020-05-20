<script>
  import get from 'lodash-es/get';
  import Labeled from './Labeled.svelte';
  import {globalStore} from './stores';

  export let className = '';
  export let defaultValue = '';
  export let formatter = undefined;
  export let label;
  export let path = undefined;
  export let store = globalStore;
  export let vertical = false;

  let value = '';
  $: if (path) value = get($store, path) || defaultValue;
  $: if (formatter) value = formatter(value);
</script>

<Labeled {className} {label} {vertical}>{value}</Labeled>
