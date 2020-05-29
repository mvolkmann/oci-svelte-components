<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';
  import {getId, styleObjectToString} from './util';

  export let className = '';
  export let info = '';
  export let label;
  export let max = undefined;
  export let min = undefined;
  export let minLength = 0;
  export let path = undefined;
  export let placeholder = '';
  export let required = false;
  export let rows = 1;
  export let store = globalStore;
  export let type = 'text';
  export let value = undefined;
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  const id = getId('input-');
  let invalid = false;
  let props;
  let ref;

  $: if (path) value = get($store, path);

  $: {
    if (type === 'checkbox') {
      props = {checked: typeof value === 'boolean' ? value : value === 'on'};
    } else {
      props = {value};
      if (max !== undefined) props.max = max;
      if (min !== undefined) props.min = min;
      if (minLength !== undefined) props.minLength = minLength;
      if (placeholder) props.placeholder = placeholder;
    }
  }

  $: if (ref) {
    const invalidElement = ref.querySelector(':invalid');
    invalid = invalidElement !== null;
  }

  function handleInput(event) {
    const {target} = event;
    const value =
      type === 'number'
        ? Number(target.value)
        : type === 'checkbox'
        ? target.checked
        : target.value;
    update(store, path, value, dispatch);
  }

  $: classes = 'osc-input' + (className ? ' ' + className : '');
  $: inputClasses =
    (value && invalid ? ' invalid' : '') + (vertical ? ' vertical' : '');

  let style = {};
  $: canUseWidth = type !== 'checkbox' && type !== 'color';
  $: {
    style = {};
    if (canUseWidth && width) style.width = width;
    if (type === 'date') style.paddingBottom = style.paddingTop = '5px';
  }

  $: onRight = !vertical && (type === 'checkbox' || type === 'radio');
</script>

<Labeled
  className={classes}
  {id}
  {info}
  {label}
  {onRight}
  {required}
  {vertical}>
  {#if rows === 1}
    <input
      class={inputClasses}
      {id}
      on:input={handleInput}
      {required}
      style={styleObjectToString(style)}
      {type}
      {...props} />
  {:else if rows > 1}
    <textarea
      class={inputClasses}
      {id}
      on:input={handleInput}
      {required}
      {rows}
      style={styleObjectToString(style)}
      {...props} />
  {/if}
</Labeled>

<style>
  input,
  textarea {
    border: solid var(--osc-border-color, lightgray) 1px;
    border-radius: var(--osc-border-radius, 4px);
    font-size: 1rem;
    margin-bottom: 0;
    padding: 0.5rem;
  }

  input[type='checkbox'] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: relative;
  }

  input[type='checkbox'].vertical {
    margin: 0;
  }

  input[type='checkbox']:checked:after {
    color: var(--osc-primary-color, cornflowerblue);
    content: '\2714';
    position: absolute;
    left: 1px;
    bottom: 0;
  }

  input:focus,
  textarea:focus {
    outline-color: var(--osc-secondary-color, orange);
  }

  input:invalid,
  textarea:invalid {
    border: solid var(--osc-error-color, red) 1px;
  }

  input[type='checkbox']:focus,
  input[type='radio']:focus {
    outline: solid var(--osc-secondary-color, orange) 2px;
  }
</style>
