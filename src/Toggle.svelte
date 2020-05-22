<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';
  import {getId} from './util';

  export let className = '';
  export let info = undefined;
  export let label;
  export let on = undefined;
  export let path = undefined;
  export let store = globalStore;
  export let vertical = false;

  const dispatch = createEventDispatcher();
  const id = getId('labeled-input-');

  $: if (path) on = get($store, path);

  $: classes =
    'osc-labeled-toggle' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  $: toggleClasses =
    'osc-labeled-toggle' + (on ? ' on' : '') + (vertical ? ' vertical' : '');

  const handleClick = () => update(store, path, !on, dispatch);
</script>

<Labeled className={classes} {id} {info} {label} on:click={handleClick}>
  <button class={toggleClasses} on:click={handleClick} type="button">
    <div class="thumb" />
  </button>
</Labeled>

<style>
  .osc-labeled-toggle {
    --padding: 2px;
    --size: 25px;
    --thumb-color: white;
    --toggle-color: var(--osc-primary-color, cornflowerblue);

    display: flex;
    align-items: center;

    background-color: var(--osc-secondary-color, orange);
    box-sizing: border-box;
    height: var(--size);
    width: calc(var(--size) * 1.8);
    border: none;
    border-radius: calc(var(--size) / 2);
    margin-bottom: 0;
    padding: var(--padding);
    position: relative;
  }

  .osc-labeled-toggle:focus {
    outline: solid var(--osc-secondary-color, orange) 2px;
  }

  .osc-labeled-toggle.on {
    background-color: var(--osc-primary-color, cornflowerblue);
  }

  .osc-labeled-toggle.on .thumb {
    left: calc(var(--size) * 0.88);
  }

  .thumb {
    --thumb-size: calc(var(--size) - (var(--padding) * 2));

    position: absolute;
    left: var(--padding);
    top: calc(var(--padding) - var(--border-width));

    height: var(--thumb-size);
    width: var(--thumb-size);

    background-color: var(--thumb-color);
    border-radius: calc(var(--thumb-size) / 2);

    transition-duration: 0.3s;
    transition-property: left;
  }
</style>
