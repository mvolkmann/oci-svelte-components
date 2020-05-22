<script>
  import Info from '../src/Info.svelte';
  import Input from '../src/Input.svelte';
  import Select from '../src/Select.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    info: {
      hPosition: 'right',
      text: 'This is a single line.',
      vPosition: 'center'
    }
  });
</script>

<Input label="text" path="info.text" width="300px" />
<Select
  label="hPosition"
  options={['left', 'center', 'right']}
  path="info.hPosition" />
<Select
  label="vPosition"
  options={['top', 'center', 'bottom']}
  path="info.vPosition" />

<Info
  className="storybook-info"
  hPosition={$globalStore.info.hPosition}
  text={$globalStore.info.text}
  vPosition={$globalStore.info.vPosition} />

<style>
  :global(.storybook-info) {
    margin: 5rem 10rem;
  }
</style>
