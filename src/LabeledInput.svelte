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
  export let value = '';
  export let vertical = false;
  export let width = '';

  const dispatch = createEventDispatcher();

  let focus = false;
  let invalid = false;
  let ref;

  if (statePath) value = get($globalStore, statePath);

  $: if (ref) {
    const invalidElement = ref.querySelector(':invalid');
    invalid = invalidElement !== null;
  }

  function handleInput(event) {
    const {value} = event.target;
    if (statePath) setState(statePath, value);
    dispatch('input', value);
  }

  const onLeft = type !== 'checkbox' && type !== 'radio';

  $: cn =
    (className ? ' ' + className : '') +
    (focus ? ' focus' : '') +
    (value && invalid ? ' invalid' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;

  const props = {};
  if (minLength) props.minLength = minLength;

  if (type === 'date') {
    style.paddingBottom = style.paddingTop = '5px';
  }
</script>

<Labeled {info} {label} {onLeft} {required} {vertical}>
  <input
    class={cn}
    on:input={handleInput}
    on:blur={() => (focus = false)}
    on:focus={() => (focus = true)}
    {placeholder}
    {required}
    {style}
    {type}
    {value}
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

    &.focus {
      outline: solid var(--secondary-color) 2px;
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
    }

    &.vertical {
      margin-left: 0;
      margin-top: 0.2rem;
    }
  }
</style>
