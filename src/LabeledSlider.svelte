<script>
  import get from 'lodash/get';
  import {createEventDispatcher} from 'svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, setState} from './stores';

  export let className = '';
  export let label;
  export let max = 100;
  export let min = 0;
  export let statePath;
  export let vertical = false;
  export let width = '10rem';

  const THUMB_SIZE = 20;
  const HALF_THUMB_SIZE = THUMB_SIZE / 2;
  const MIN_LEFT = -HALF_THUMB_SIZE;
  const dispatch = createEventDispatcher();

  let dx = 0;
  let dragging = false;
  let trackRef;
  let thumbRef;
  let value = 0;

  $: value = get($globalStore, statePath) || 0;
  $: percent = (value - min) / (max - min);
  $: percentToUse = Math.min(Math.max(percent, 0), 1);
  $: left =
    'calc(' + width + ' * ' + percentToUse + ' - ' + HALF_THUMB_SIZE + 'px)';
  $: trackStyle = 'width: ' + width;

  $: trackLeft = thumbRef
    ? thumbRef.parentElement.getBoundingClientRect().left
    : 0;
  $: if (trackRef) {
    trackRef.style.setProperty('--thumb-size', THUMB_SIZE + 'px');
  }

  $: maxLeft = thumbRef
    ? thumbRef.parentElement.getBoundingClientRect().width - HALF_THUMB_SIZE
    : 0;

  $: classes =
    'labeled-slider' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  function handleMouseDown(event) {
    dx = event.offsetX;
    dragging = true;
  }

  function handleMouseMove(event) {
    if (!dragging) return;

    const newLeft = Math.ceil(event.clientX - dx - trackLeft);
    if (MIN_LEFT <= newLeft && newLeft <= maxLeft) {
      thumbRef.style.left = newLeft + 'px';

      const percent = (newLeft - MIN_LEFT) / (maxLeft - MIN_LEFT);
      const value = Math.round(min + (max - min) * percent);
      setState(statePath, value);
      dispatch('input', value);
    }
  }

  function handleMouseUp() {
    dragging = false;
  }
</script>

<Labeled className={classes} {label}>
  <div class="track" bind:this={trackRef} style={trackStyle}>
    <div
      bind:this={thumbRef}
      class="thumb"
      on:mousedown={handleMouseDown}
      on:mousemove={handleMouseMove}
      on:mouseup={handleMouseUp}
      style={'left: ' + left} />
  </div>
</Labeled>

<style>
  .labeled-slider {
    display: inline-flex;
    align-items: center;
  }

  .thumb {
    position: absolute;
    top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);

    background-color: var(--primary-color);
    /* background-color: #ff000060; */
    border-radius: calc(var(--thumb-size) / 2);
    display: inline-block;
    height: var(--thumb-size);
    width: var(--thumb-size);
  }

  .track {
    --track-height: 6px;

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
  }

  .vertical input {
    margin-left: 0;
  }
</style>
