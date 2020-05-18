<script>
  import get from 'lodash-es/get';
  import {globalStore, setState} from './stores';

  export let component;
  export let path;

  $: value = get($globalStore, path);

  const props = {...$$props};
  delete props.component;
  delete props.path;

  const update = event => setState(path, event.detail);
</script>

<svelte:component this={component} {value} on:value={update} {...props} />
