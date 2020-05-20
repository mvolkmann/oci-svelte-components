<script>
  import Info from '../src/Info.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledSelect from '../src/LabeledSelect.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    info: {
      hPosition: 'right',
      text: 'This is a single line.',
      vPosition: 'center'
    }
  });
</script>

<LabeledInput label="text" path="info.text" width="300px" />
<LabeledSelect
  label="hPosition"
  options={['left', 'center', 'right']}
  path="info.hPosition" />
<LabeledSelect
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
