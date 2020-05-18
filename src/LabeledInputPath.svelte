<script>
  import get from 'lodash/get';
  import {createEventDispatcher} from 'svelte';
  import LabeledInput from './LabeledInput.svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let max = undefined;
  export let min = undefined;
  export let minLength = 0;
  export let placeholder = '';
  export let required = false;
  export let statePath;
  export let type = 'text';
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();
  let value = '';

  $: if (statePath) value = get($globalStore, statePath);

  function handleInput(event) {
    const {detail} = event;
    if (statePath) setState(statePath, detail);
    dispatch('input', detail);
  }
</script>

<LabeledInput
  {className}
  {info}
  {label}
  {max}
  {min}
  {minLength}
  on:input={handleInput}
  {placeholder}
  {required}
  {type}
  {value}
  {vertical}
  {width} />
