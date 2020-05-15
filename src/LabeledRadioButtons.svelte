<script>
  import Labeled from './Labeled.svelte';
  import get from 'lodash/get';
  import {createEventDispatcher} from 'svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let info = '';
  export let label;
  export let name;
  export let options;
  export let required = false;
  export let statePath = '';
  export let vertical = false;

  const dispatch = createEventDispatcher();

  let invalid = false;
  let value;

  $: if (statePath) value = get($globalStore, statePath);

  const getOptionValue = option =>
    typeof option === 'string' ? option : option.value;

  function handleInput(event) {
    const {value} = event.target;
    if (statePath) setState(statePath, value);
    dispatch('input', value);
  }

  $: classes =
    (className ? ' ' + className : '') + (value && invalid ? ' invalid' : '');

  const containerClasses = 'container' + (vertical ? ' vertical' : '');
</script>

<Labeled className={classes} {info} {label} {required} {vertical}>
  <div class={containerClasses}>
    {#each options as option, index}
      <div class="option">
        <input
          checked={value === getOptionValue(option)}
          id={name + index}
          {name}
          on:input={handleInput}
          type="radio"
          value={getOptionValue(option)} />
        <label for={name + index}>
          {typeof option === 'string' ? option : option.label}
        </label>
      </div>
    {/each}
  </div>
</Labeled>

<style lang="scss">
  .container {
    display: inline-flex;
    align-items: center;

    .option {
      display: flex;
      align-items: center;
    }

    &.vertical {
      flex-direction: column;
      align-items: flex-start;

      margin-left: 0;
      margin-top: 0.3rem;

      .option {
        margin-bottom: 0.5rem;
      }
    }
  }

  input {
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 0.5rem;

    &:focus {
      outline: solid var(--secondary-color) 2px;
    }
  }

  label {
    margin-left: 0.5rem;
  }

  .vertical {
    input:first-of-type {
      margin-left: 0;
    }
  }
</style>
