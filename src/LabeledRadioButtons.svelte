<script>
  import Labeled from './Labeled.svelte';
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let name;

  // This is an array where each element is either a string
  // or an object with label and value properties.
  export let options;

  export let path = undefined;
  export let required = false;
  export let store = globalStore;
  export let vertical = false;

  const dispatch = createEventDispatcher();

  let invalid = false;
  let value;

  $: if (path) value = get($store, path);

  const getOptionValue = option =>
    typeof option === 'string' ? option : option.value;

  const handleInput = event =>
    update(store, path, event.target.value, dispatch);

  $: classes =
    'osc-labeled-radio-buttons' +
    (className ? ' ' + className : '') +
    (value && invalid ? ' invalid' : '');

  $: containerClasses = 'container' + (vertical ? ' vertical' : '');
</script>

<Labeled className={classes} {info} {label} {required} {vertical}>
  <div class={containerClasses}>
    {#each options as option}
      <label class="option">
        <input
          checked={value === getOptionValue(option)}
          {name}
          on:input={handleInput}
          type="radio"
          value={getOptionValue(option)} />
        {typeof option === 'string' ? option : option.label}
      </label>
    {/each}
  </div>
</Labeled>

<style>
  .container {
    display: inline-flex;
    align-items: center;
  }

  input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    --size: 18px;
    width: var(--size);
    height: var(--size);
    border-radius: calc(var(--size) / 2);
    border: solid lightgray 1px;

    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 1rem;
    margin-top: 0;
  }

  input:checked {
    background-color: var(--osc-primary-color, cornflowerblue);
    border-color: var(--osc-primary-color, cornflowerblue);
  }

  input:focus {
    outline: solid var(--osc-secondary-color, orange) 2px;
  }

  .option {
    display: flex;
    align-items: center;

    margin-left: 0.2rem;
  }

  .vertical {
    flex-direction: column;
    align-items: flex-start;

    margin-left: 0;
    margin-top: 0.3rem;
  }

  .vertical > .option {
    margin-bottom: 0.5rem;
  }

  .vertical > .option > input:first-of-type {
    margin-left: 0;
  }
</style>
