<script>
  import Labeled from './Labeled.svelte';
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let options;
  export let placeholder = '';
  export let required = false;
  export let statePath = '';
  export let style = {};
  export let value = '';
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  let invalid = false;
  let ref;

  $: if (statePath) value = get($globalStore, statePath);

  $: if (ref) {
    // Adjust the select width to accommodate
    // the downward triangle added in the CSS below.
    const width = getComputedStyle(ref).width;
    ref.style.width = parseInt(width) + 20 + 'px';
  }

  function handleChange(event) {
    const {value} = event.target;
    if (statePath) setState(statePath, value);
    dispatch('change', value);
  }

  $: classes =
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
      <option value="">{placeholder}</option>
      {#each options as option}
        <option value={typeof option === 'string' ? option : option.value}>
          {typeof option === 'string' ? option : option.text || option.value}
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
    top: 12px;
    right: 5px;
  }

  select {
    display: inline-flex;
    align-items: center;

    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    border-radius: var(--border-radius, 0);
    font-size: 1rem;
    height: 36px;
    margin-bottom: 0;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    position: relative;
    /*width: fit-content;*/
    width: max-content;
  }

  select:focus {
    outline-color: var(--secondary-color);
  }

  select:invalid {
    border: solid var(--error-color, red) 1px;
  }

  select.vertical {
    flex-direction: column;
    align-items: flex-start;

    margin-left: 0;
    margin-top: 0.3rem;
  }
</style>
