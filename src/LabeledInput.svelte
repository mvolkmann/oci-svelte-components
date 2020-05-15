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
    console.log('LabeledInput.svelte x: value =', value);
    props = {value};
    if (type !== 'checkbox') {
      if (minLength) props.minLength = minLength;
      if (placeholder) props.placeholder = placeholder;
    }
  }
  $: console.log('LabeledInput.svelte x: props =', props);

  $: if (ref) {
    const invalidElement = ref.querySelector(':invalid');
    invalid = invalidElement !== null;
  }

  function handleInput(event) {
    let {value} = event.target;
    console.log('LabeledInput.svelte handleInput: value =', value);
    if (type === 'checkbox') value = value === 'on';
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

<style lang="scss">
  input {
    border: solid lightgray 1px;
    border-radius: var(--border-radius, 0);
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 0.5rem;
    padding: 0.5rem;

    &[type='checkbox'] {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      position: relative;

      &:checked:after {
        content: '\2714';
        position: absolute;
        left: 1px;
        bottom: 0;
      }
    }

    &:focus {
      outline-color: var(--secondary-color);
    }

    &.invalid {
      border: solid var(--error-color, red) 1px;
    }

    /* For checkboxes and radio buttons where the label is on the right side,
       add a bit of space to the left of the label. */
    & + :global(label) {
      margin-left: 0.5rem;
    }

    &[type='checkbox'],
    &[type='radio'] {
      margin-left: 0;

      &:focus {
        outline: solid var(--secondary-color) 2px;
      }
    }

    &.vertical {
      margin-left: 0;
      margin-top: 0.3rem;
    }
  }
</style>
