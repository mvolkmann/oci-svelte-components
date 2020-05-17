<script>
  import get from 'lodash/get';
  import Labeled from './Labeled.svelte';
  import {globalStore} from './stores';

  export let className = '';
  export let formatter = undefined;
  export let label;
  export let statePath;
  export let vertical = false;

  let value = '';
  $: {
    value = get($globalStore, statePath) || 0;
    if (formatter) value = formatter(value);
  }
</script>

<Labeled {className} {label} {vertical}>{value}</Labeled>
