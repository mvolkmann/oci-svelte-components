<script>
  import get from 'lodash/get';
  import Labeled from './Labeled.svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let label;
  export let statePath;
  export let vertical = false;

  $: on = get($globalStore, statePath);

  $: classes =
    'toggle' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  $: toggleClasses =
    'toggle' + (on ? ' on' : '') + (vertical ? ' vertical' : '');

  const handleClick = () => setState(statePath, !on);
</script>

<Labeled className={classes} {label}>
  <div class={toggleClasses} on:click={handleClick}>
    <div class="thumb" />
  </div>
</Labeled>

<style>
  .toggle {
    --padding: 2px;
    --size: 25px;
    --thumb-color: white;
    --toggle-color: var(--primary-color);

    display: flex;
    align-items: center;

    background-color: var(--secondary-color);
    box-sizing: border-box;
    height: var(--size);
    width: calc(var(--size) * 1.8);
    border: none;
    border-radius: calc(var(--size) / 2);
    padding: var(--padding);
    position: relative;
  }

  .toggle:focus {
    outline: solid var(--secondary-color) 2px;
  }

  .toggle.on {
    background-color: var(--primary-color);
  }

  .toggle.on .thumb {
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
