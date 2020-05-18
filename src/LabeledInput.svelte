<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let max = undefined;
  export let min = undefined;
  export let minLength = 0;
  export let path = undefined;
  export let placeholder = '';
  export let required = false;
  export let store = globalStore;
  export let style = {};
  export let type = 'text';
  export let value = undefined;
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  const id = 'labeled-input-' + Date.now();
  let invalid = false;
  let props;
  let ref;

  $: if (path) value = get($store, path);

  $: {
    if (type === 'checkbox') {
      props = {checked: typeof value === 'boolean' ? value : value === 'on'};
    } else {
      props = {value};
      if (max) props.max = max;
      if (min) props.min = min;
      if (minLength) props.minLength = minLength;
      if (placeholder) props.placeholder = placeholder;
    }
  }

  $: if (ref) {
    const invalidElement = ref.querySelector(':invalid');
    invalid = invalidElement !== null;
  }

  function handleInput(event) {
    const {target} = event;
    const value = type === 'checkbox' ? target.checked : target.value;
    update(store, path, value, dispatch);
  }

  const onRight = type === 'checkbox' || type === 'radio';

  $: classes =
    'osc-labeled-input' +
    (className ? ' ' + className : '') +
    (value && invalid ? ' invalid' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;

  if (type === 'date') {
    style.paddingBottom = style.paddingTop = '5px';
  }
</script>

<Labeled {id} {info} {label} {onRight} {required} {vertical}>
  <input
    class={classes}
    {id}
    on:input={handleInput}
    {required}
    {style}
    {type}
    {...props} />
</Labeled>

<style>
  input {
    border: solid lightgray 1px;
    border-radius: var(--osc-border-radius, 0);
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

  input[type='checkbox']:checked:after {
    color: var(--osc-primary-color);
    content: '\2714';
    position: absolute;
    left: 1px;
    bottom: 0;
  }

  input:focus {
    outline-color: var(--osc-secondary-color);
  }

  input:invalid {
    border: solid var(--osc-error-color, red) 1px;
  }

  input[type='checkbox']:focus,
  input[type='radio']:focus {
    outline: solid var(--osc-secondary-color) 2px;
  }
</style>
