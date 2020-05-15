<script>
  import get from 'lodash/get';
  import {createEventDispatcher} from 'svelte';
  import Info from './Info.svelte';
  import Label from './Label.svelte';
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
    dispatch('change', value);
  }

  const cn =
    'labeled-input' +
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

  const labelOnLeft = type !== 'checkbox' && type !== 'radio';
</script>

<div bind:this={ref} class={cn}>
  {#if labelOnLeft}
    <Label {required} text={label}>
      {#if info}
        <Info text={info} />
      {/if}
    </Label>
  {/if}

  <input
    on:input={handleInput}
    on:blur={() => (focus = false)}
    on:focus={() => (focus = true)}
    {placeholder}
    {required}
    {style}
    {type}
    {value}
    {...props} />

  {#if !labelOnLeft}
    <Label {required} text={label}>
      {#if info}
        <Info text={info} />
      {/if}
    </Label>
  {/if}
</div>

<style lang="scss">
  .labeled-input {
    display: flex;
    align-items: center;

    .focus {
      input {
        outline: solid var(--secondary-color) 2px;
      }

      .label {
        color: var(--secondary-color);
      }
    }

    &.invalid {
      label {
        color: var(--error-color, red);
      }
    }

    input {
      border: solid lightgray 1px;
      font-size: 1rem;
      margin-bottom: 0;
      margin-left: 0.5rem;
      padding: 0.5rem;

      &:invalid {
        border: solid var(--error-color, red) 1px;
      }

      // For checkboxes and radio buttons where the label is on the right side,
      // add a bit of space between them.
      & + label {
        margin-left: 0.3rem;
      }
    }

    .required {
      font-size: 1.2rem;
      line-height: 14px;
      margin-left: 5px;
      position: relative;
      top: 5px;
    }

    &.vertical {
      flex-direction: column;
      align-items: flex-start;

      input {
        margin-left: 0;
        margin-top: 0.2rem;
      }
    }
  }
</style>
