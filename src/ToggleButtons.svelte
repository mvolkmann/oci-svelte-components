<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  //import Icon from './Icon.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let options;
  export let path = undefined;
  export let store = globalStore;
  export let value = undefined;

  const dispatch = createEventDispatcher();

  $: if (path) value = get($store, path);

  const classes = 'osc-toggle-buttons' + (className ? ' ' + className : '');

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

    background-color: var(--osc-toggle-buttons-background-color, orange);
    border: none;
    border-left: solid black 1px;
    border-radius: 0;
    color: var(--osc-toggle-buttons-color, orange);
    font-size: 1rem;
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
    outline: solid var(--osc-secondary-color, orange) 2px;
  }

  button:last-of-type {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  button.selected {
    background-color: var(
      --osc-toggle-buttons-selected-background-color,
      cornflowerblue
    );
    color: var(--osc-toggle-buttons-selected-color, white);
  }

  /* button.selected svg {
    color: white;
  } */

  .osc-toggle-buttons :global(.osc-icon) {
    margin-right: 0.5rem;
  }

  .osc-toggle-buttons {
    display: flex;
    margin-bottom: 0.5rem;
  }
</style>
