<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let info = '';
  export let label;

  // This is an array where each element is either a string
  // or an object with label and value properties.
  export let options;

  export let omitEmpty = false;
  export let path = undefined;
  export let placeholder = '';
  export let required = false;
  export let store = globalStore;
  export let style = {};
  export let value = '';
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  let invalid = false;
  let ref;

  $: if (path) value = get($store, path);

  $: if (ref) {
    // Adjust the select width to accommodate
    // the downward triangle added in the CSS below.
    const width = getComputedStyle(ref).width;
    ref.style.width = parseInt(width) + 24 + 'px';
  }

  const handleChange = event =>
    update(store, path, event.target.value, dispatch);

  $: classes =
    'osc-labeled-select' +
    (className ? ' ' + className : '') +
    (value && invalid ? ' invalid' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;
</script>

<Labeled {info} {label} {required} {vertical}>
  <div class="container">
    <select
      bind:this={ref}
      class={classes}
      on:change={handleChange}
      {required}
      {value}>
      {#if !omitEmpty}
        <option value="">{placeholder}</option>
      {/if}
      {#each options as option}
        <option value={typeof option === 'string' ? option : option.value}>
          {typeof option === 'string' ? option : option.label || option.value}
        </option>
      {/each}
    </select>
  </div>
</Labeled>

<style>
  .container {
    display: inline-block;
    position: relative;
  }

  .container::after {
    content: '\25bc';
    pointer-events: none;
    position: absolute;
    top: 14px;
    right: 5px;
  }

  select {
    display: inline-flex;
    align-items: center;

    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    border-radius: var(--osc-border-radius, 0);
    font-size: 1rem;
    height: 36px;
    margin-bottom: 0;
    padding-left: 0.5rem;
    position: relative;
    width: max-content;
  }

  select:focus {
    outline-color: var(--osc-secondary-color, orange);
  }

  select:invalid {
    border: solid var(--osc-error-color, red) 1px;
  }

  select.vertical {
    flex-direction: column;
    align-items: flex-start;

    padding-top: 8px; /* not sure why this is needed */
  }
</style>
