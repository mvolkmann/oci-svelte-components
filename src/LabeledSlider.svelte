<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let label;
  export let max = 100;
  export let min = 0;
  export let path = undefined;
  export let store = globalStore;
  export let vertical = false;
  export let width = '10rem';

  const THUMB_SIZE = 20;
  const HALF_THUMB_SIZE = THUMB_SIZE / 2;
  const MIN_LEFT = -HALF_THUMB_SIZE;
  const dispatch = createEventDispatcher();

  let containerRef;
  let dx = 0;
  let thumbRef;
  let value = 0;

  $: if (path) value = get($store, path);

  $: percent = (value - min) / (max - min);
  $: percentToUse = Math.min(Math.max(percent, 0), 1);
  $: left =
    'calc(' + width + ' * ' + percentToUse + ' - ' + HALF_THUMB_SIZE + 'px)';

  $: trackLeft = thumbRef
    ? thumbRef.parentElement.getBoundingClientRect().left
    : 0;
  $: if (containerRef) {
    containerRef.style.setProperty('--thumb-size', THUMB_SIZE + 'px');
  }

  $: maxLeft = thumbRef
    ? thumbRef.parentElement.getBoundingClientRect().width - HALF_THUMB_SIZE
    : 0;

  const classes =
    'osc-labeled-slider' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  const trackClasses = 'track' + (vertical ? ' vertical' : '');

  function handleKeyDown(event) {
    const {key} = event;
    if (key === 'ArrowLeft') {
      const newValue = value - 1;
      if (newValue >= min) update(store, path, newValue, dispatch);
    } else if (key === 'ArrowRight') {
      const newValue = value + 1;
      if (newValue <= max) update(store, path, newValue, dispatch);
    }
  }

  function handleMouseDown(event) {
    // Prevent beginning text selection outside this component.
    event.preventDefault();
    thumbRef.focus();
    dx = event.offsetX;
  }

  function handleMouseMove(event) {
    // Bail if the first mouse button isn't down.
    if (event.buttons !== 1) return;

    const newLeft = Math.ceil(event.clientX - dx - trackLeft);
    if (MIN_LEFT <= newLeft && newLeft <= maxLeft) {
      thumbRef.style.left = newLeft + 'px';

      const percent = (newLeft - MIN_LEFT) / (maxLeft - MIN_LEFT);
      const value = Math.round(min + (max - min) * percent);
      update(store, path, value, dispatch);
    }
  }
</script>

<Labeled className={classes} {label}>
  <div
    bind:this={containerRef}
    class="container"
    on:keydown={handleKeyDown}
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}>
    <div class={trackClasses} style={'width: ' + width}>
      <div
        bind:this={thumbRef}
        class="thumb"
        style={'left: ' + left}
        tabindex="0" />
    </div>
  </div>
</Labeled>

<style>
  .container {
    --track-height: 6px;

    height: calc(var(--thumb-size) + var(--track-height) - 2px);
  }

  .osc-labeled-slider {
    display: inline-flex;
    align-items: center;
  }

  .thumb {
    position: absolute;
    top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);

    background-color: var(--osc-primary-color, cornflowerblue);
    /* background-color: #ff000060; */
    border-radius: calc(var(--thumb-size) / 2);
    display: inline-block;
    height: var(--thumb-size);
    width: var(--thumb-size);
  }

  .thumb:focus {
    outline: solid var(--osc-secondary-color, orange) 3px;
  }

  .track {
    background-color: lightgray;
    border: none;
    display: inline-block;
    height: var(--track-height);
    margin-left: calc(var(--thumb-size) / 2);
    position: relative;
  }

  .vertical {
    align-items: flex-start;
    flex-direction: column;
    margin-top: calc(var(--thumb-size) / 2 - var(--track-height) / 2);
  }
</style>
