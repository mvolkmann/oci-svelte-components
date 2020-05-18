<script>
  import Labeled from './Labeled.svelte';
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let name;
  export let options;
  export let path = undefined;
  export let required = false;
  export let store = undefined;
  export let vertical = false;

  const dispatch = createEventDispatcher();

  let invalid = false;
  let value;

  if (path && !store) store = globalStore;
  $: if (path) value = get($store, path);

  const getOptionValue = option =>
    typeof option === 'string' ? option : option.value;

  const handleInput = event =>
    update(store, path, event.target.value, dispatch);

  $: classes =
    'osc-labeled-radio-buttons' +
    (className ? ' ' + className : '') +
    (value && invalid ? ' invalid' : '');

  const containerClasses = 'container' + (vertical ? ' vertical' : '');
</script>

<Labeled className={classes} {info} {label} {required} {vertical}>
  <div class={containerClasses}>
    {#each options as option, index}
      <div class="option">
        <input
          checked={value === getOptionValue(option)}
          id={name + index}
          {name}
          on:input={handleInput}
          type="radio"
          value={getOptionValue(option)} />
        <label for={name + index}>
          {typeof option === 'string' ? option : option.label}
        </label>
      </div>
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
    margin-left: 0.5rem;
  }

  input:checked {
    background-color: var(--osc-primary-color);
    border-color: var(--osc-primary-color);
  }

  input:focus {
    outline: solid var(--osc-secondary-color) 2px;
  }

  label {
    margin-left: 0.5rem;
  }

  .option {
    display: flex;
    align-items: center;
  }

  .vertical {
    flex-direction: column;
    align-items: flex-start;

    margin-left: 0;
    margin-top: 0.3rem;
  }

  .vertical > .option > input:first-of-type {
    margin-left: 0;
  }

  .vertical > .option {
    margin-bottom: 0.5rem;
  }

  .vertical > .option > label {
    margin-bottom: 0;
  }
</style>
