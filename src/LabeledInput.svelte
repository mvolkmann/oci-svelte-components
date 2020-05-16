<script>
  import Labeled from './Labeled.svelte';
  import get from 'lodash/get';
  import {createEventDispatcher} from 'svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let minLength = 0;
  export let placeholder = '';
  export let required = false;
  export let statePath = '';
  export let style = {};
  export let type = 'text';
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  const id = 'labeled-input-' + Date.now();
  let invalid = false;
  let props;
  let ref;
  let value;

  $: {
    if (statePath) value = get($globalStore, statePath);
    if (type === 'checkbox') {
      props = {checked: typeof value === 'boolean' ? value : value === 'on'};
    } else {
      props = {value};
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
    if (statePath) setState(statePath, value);
    dispatch('input', value);
  }

  const onLeft = type !== 'checkbox' && type !== 'radio';

  $: classes =
    (className ? ' ' + className : '') +
    (value && invalid ? ' invalid' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;

  if (type === 'date') {
    style.paddingBottom = style.paddingTop = '5px';
  }
</script>

<Labeled {id} {info} {label} {onLeft} {required} {vertical}>
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
    border-radius: var(--border-radius, 0);
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 0.5rem;
    padding: 0.5rem;
  }

  input[type='checkbox'] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: relative;
  }

  input[type='checkbox']:checked:after {
    color: var(--primary-color);
    content: '\2714';
    position: absolute;
    left: 1px;
    bottom: 0;
  }

  input[type='checkbox']:focus {
    outline-color: var(--secondary-color);
  }

  input[type='checkbox']:invalid {
    border: solid var(--error-color, red) 1px;
  }

  /* For checkboxes and radio buttons where the label is on the right side,
      add a bit of space to the left of the label. */
  input[type='checkbox'] + :global(label) {
    margin-left: 0.5rem;
  }

  input[type='checkbox'],
  input[type='radio'] {
    margin-left: 0;
  }

  input[type='checkbox']:focus,
  input[type='radio']:focus {
    outline: solid var(--secondary-color) 2px;
  }

  .vertical {
    margin-left: 0;
    margin-top: 0.3rem;
  }
</style>
