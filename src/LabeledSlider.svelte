<script>
  import get from 'lodash-es/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';

  export let className = '';
  export let info = undefined;
  export let label;
  export let max = 100;
  export let min = 0;
  export let path = undefined;
  export let showLimits = false;
  export let showValue = false;
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
  let rect;
  let value = 0;

  $: if (path) value = get($store, path);

  $: percent = (value - min) / (max - min);
  $: percentToUse = Math.min(Math.max(percent, 0), 1);
  $: left =
    'calc(' + width + ' * ' + percentToUse + ' - ' + HALF_THUMB_SIZE + 'px)';

  $: if (thumbRef) rect = thumbRef.parentElement.getBoundingClientRect();
  $: trackLeft = rect ? rect.left : 0;
  $: maxLeft = rect ? Math.ceil(rect.width) - HALF_THUMB_SIZE : 0;

  $: if (containerRef) {
    containerRef.style.setProperty('--thumb-size', THUMB_SIZE + 'px');
  }

  const classes =
    'osc-labeled-slider' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  $: trackClasses =
    'track' + (showLimits ? ' limits' : '') + (vertical ? ' vertical' : '');

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

    let newLeft = Math.ceil(event.clientX - dx - trackLeft);
    if (MIN_LEFT <= newLeft && newLeft <= maxLeft) {
      thumbRef.style.left = newLeft - (showLimits ? 1 : 0) + 'px';
      const percent = (newLeft - MIN_LEFT) / (maxLeft - MIN_LEFT);
      const value = min + (max - min) * percent;
      update(store, path, Math.round(value), dispatch);
    }
  }
</script>

<Labeled className={classes} {info} {label} {vertical}>
  <div class="outer">
    <div class="inner">
      <div
        bind:this={containerRef}
        class="top"
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
      {#if showLimits}
        <div class="bottom">
          <div class="limit">{min}</div>
          <div class="limit">{max}</div>
        </div>
      {/if}
    </div>
    {#if showValue}
      <div class="value">{value}</div>
    {/if}
  </div>
</Labeled>

<style>
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: -2px;
    width: 100%;
  }

  .limit {
    font-size: 0.7rem;
    margin-left: 0.5rem;
  }

  .osc-labeled-slider {
    display: inline-flex;
    align-items: center;
  }

  .outer {
    display: flex;
  }

  .thumb {
    position: absolute;
    top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);

    background-color: var(--osc-primary-color, cornflowerblue);
    /* background-color: #ff000060; */
    border-radius: calc(var(--thumb-size) / 2);
    display: inline-block;
    height: var(--thumb-size);
    opacity: 0.5;
    width: var(--thumb-size);
  }

  .thumb:focus {
    outline: solid var(--osc-secondary-color, orange) 3px;
  }

  .top {
    --track-height: 6px;

    display: flex;
    align-items: center;

    height: calc(var(--thumb-size) + var(--track-height) - 2px);
  }

  .track {
    background-color: lightgray;
    border: none;
    display: inline-block;
    height: var(--track-height);
    margin-left: 0.5rem;
    position: relative;
  }

  .track.limits {
    --limit-style: solid black 1px;
    border-left: var(--limit-style);
    border-right: var(--limit-style);
  }

  .value {
    font-weight: bold;
    margin-left: 1rem;
    margin-top: 2px;
  }
</style>
