<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  //import Icon from './Icon.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let options;
  export let path = undefined;
  export let store = undefined;
  export let value = undefined;

  const dispatch = createEventDispatcher();

  if (path && !store) store = globalStore;
  $: if (path) value = get($store, path);

  const classes = 'toggle-buttons' + (className ? ' ' + className : '');

  const getPairText = option =>
    typeof option === 'object' ? option.text || option.value : option;

  const getPairValue = option =>
    typeof option === 'object' ? option.value : option;

  const setValue = option =>
    update(store, path, getPairValue(option), dispatch);
</script>

<div class={classes}>
  {#each options as option}
    <button
      class={getPairValue(option) === value ? 'selected' : ''}
      on:click={() => setValue(option)}
      type="button">
      <!--{thisIcon && <Icon icon={thisIcon} size="1x" />}-->
      {getPairText(option)}
    </button>
  {/each}
</div>

<style>
  button {
    --height: 40px;
    --border-radius: calc(var(--height) / 2);

    display: flex;
    align-items: center;

    background-color: lightgray;
    border: none;
    border-left: solid black 1px;
    border-radius: 0;
    color: black;
    outline: none;
    height: var(--height);
    padding: 0 1rem;
  }

  button:first-of-type {
    border-left: none;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  button:focus {
    outline: solid var(--secondary-color) 2px;
  }

  button:last-of-type {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  button.selected {
    background-color: var(--primary-color);
    color: white;
  }

  button.selected svg {
    color: white;
  }

  .icon {
    margin-right: 0.5rem;
  }

  .icon svg {
    color: black;
  }

  .toggle-buttons {
    display: flex;
    margin-bottom: 0.5rem;
  }
</style>
