<script>
  import get from 'lodash-es/get';
  import {globalStore, update} from './stores';

  export let component;
  export let path;

  $: value = get($globalStore, path);

  const props = {...$$props};
  delete props.component;
  delete props.path;

  const handleValue = event => update(globalStore, path, event.detail);
</script>

<svelte:component this={component} {value} on:value={handleValue} {...props} />
