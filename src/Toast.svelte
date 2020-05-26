<script>
  import {beforeUpdate} from 'svelte';
  import Line from './Line.svelte';
  import {styleObjectToString} from './util';

  export let backgroundColor = 'var(--osc-primary-color, cornflowerblue)';
  export let color = 'white';
  export let className = '';
  export let onClose = undefined;
  export let message;
  export let side = 'top';
  export let show;
  export let timeoutMs = undefined;
  export let position = 'right';
  export let width = 'fit-content';

  const oppositeSide = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom'
  };

  let toastStyle = {};

  beforeUpdate(() => updateToastStyle(side, position));

  $: classes = 'osc-toast' + (className ? ' ' + className : '');
  $: lines = message.split('\\n');
  $: if (show && timeoutMs) setTimeout(closeToast, timeoutMs);

  function closeToast() {
    show = false;
    if (onClose) onClose();
  }

  function updateToastStyle(side, position) {
    toastStyle['--background-color'] = backgroundColor;
    toastStyle.color = color;
    toastStyle.width = width;
    toastStyle[side] = show ? 0 : '-100%';
    toastStyle[oppositeSide[side]] = 'unset';

    switch (side) {
      case 'bottom':
      case 'top':
        switch (position) {
          case 'left':
            toastStyle.left = 0;
            toastStyle.right = 'unset';
            break;
          case 'right':
            toastStyle.left = 'unset';
            toastStyle.right = 0;
            break;
          case 'center':
            toastStyle.left = 0;
            toastStyle.right = 0;
            toastStyle['margin-left'] = 'auto';
            toastStyle['margin-right'] = 'auto';
            break;
          default:
            throw new Error(
              `Toast invalid horizontal position prop "${position}"`
            );
        }
        break;
      case 'left':
      case 'right':
        switch (position) {
          case 'top':
            toastStyle.top = 0;
            toastStyle.bottom = 'unset';
            toastStyle.transform = 'unset';
            break;
          case 'bottom':
            toastStyle.bottom = 0;
            toastStyle.top = 'unset';
            toastStyle.transform = 'unset';
            break;
          case 'center':
            toastStyle.top = '50%';
            toastStyle.bottom = 'unset';
            toastStyle.transform = 'translateY(-50%)';
            break;
          default:
            throw new Error(
              `Toast invalid vertical position prop "${position}"`
            );
        }
        break;
      default:
        throw new Error(`Toast invalid side prop "${side}"`);
    }
  }
</script>

<div class={classes} style={styleObjectToString(toastStyle)}>
  <button class="close" on:click={closeToast} type="button">&#10006;</button>
  {#each lines as line (line)}
    <Line {line} />
  {/each}
</div>

<style>
  .close {
    --size: 24px;
    background-color: white;
    color: var(--background-color);
    border: none;
    border-radius: calc(var(--size) / 2);
    height: var(--size);
    padding: 0;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: var(--size);
  }

  .osc-toast {
    background-color: var(--background-color);
    font-family: var(--global-font-family, sans-serif);
    margin: 0;
    padding: 1rem 3rem 1rem 1rem;
    position: fixed;
    transition-duration: 0.5s;
    z-index: 2;
  }
</style>
