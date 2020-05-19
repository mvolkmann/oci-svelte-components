<script>
  import {getStyleString} from './util';
  import Line from './Line.svelte';

  export let className = '';
  export let hPosition = 'right';
  export let vPosition = 'center';

  // The text can contain newline characters to control line breaks.
  // It can also use Markdown syntax to bold some of the text,
  // surrounding it with double asterisks.
  // For example, 'This is plain. **This is bold.** More plain text.'
  export let text;

  export let tipHeight = '0';
  export let tipWidth = 'max-content';

  const DISTANCE = 'calc(var(--size) + 0.5rem)';
  const CIRCLE_SIZE = '20px';

  let showTip = false;
  let tipRef;

  function toggleTip() {
    showTip = !showTip;
    if (tipHeight === '0') {
      // offsetHeight is not known until it is rendered.
      // The timeout allows that to happen.
      setTimeout(() => (tipHeight = tipRef.offsetHeight + 'px'));
    }
  }

  const classes = 'osc-info' + (className ? ' ' + className : '');
  const outerStyle = {'--size': CIRCLE_SIZE};

  let textStyle = {};

  $: if (showTip) {
    textStyle = {display: 'inline-block', width: tipWidth};

    if (hPosition === 'left') {
      textStyle.right = DISTANCE;
    } else if (hPosition === 'center') {
      textStyle.left = `calc(${CIRCLE_SIZE} / 2 - ${tipWidth} / 2)`;
    } else if (hPosition === 'right') {
      textStyle.left = DISTANCE;
    }

    if (vPosition === 'top') {
      textStyle.bottom = DISTANCE;
    } else if (vPosition === 'center') {
      textStyle.top = `calc(${CIRCLE_SIZE} / 2 - ${tipHeight} / 2)`;
    } else if (vPosition === 'bottom') {
      textStyle.top = DISTANCE;
    }
  } else {
    textStyle = {display: 'none'};
  }

  const lines = text.split('\n');
</script>

<div class={classes} style={getStyleString(outerStyle)}>
  <div class="circle" on:click={toggleTip}>i</div>
  <div
    class="text"
    on:click={toggleTip}
    bind:this={tipRef}
    style={getStyleString(textStyle)}>
    {#each lines as line}
      <Line {line} />
    {/each}
  </div>
</div>

<style>
  /* The --size variable is set in info.tsx. */
  .osc-info {
    display: inline-block;
    position: relative;
  }

  .circle {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background-color: var(--osc-secondary-color);
    border: none;
    border-radius: calc(var(--size) / 2);
    color: white;
    cursor: pointer;
    font-size: calc(var(--size) * 0.7);
    font-weight: bold;
    height: var(--size);
    width: var(--size);
  }

  .text {
    background-color: var(--osc-secondary-color);
    border: none;
    color: white;
    font-weight: normal;
    padding: 0.5rem;
    position: absolute;
    text-align: left;
    z-index: 2;
  }
</style>
