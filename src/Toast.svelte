<script>
  import get from 'lodash-es/get';
  import {globalStore, update} from './stores';

  export let backgroundColor = 'black';
  export let color = 'white';
  export let className = '';
  export let not = false;
  export let onClose = undefined;
  export let message;
  export let path;
  export let store = globalStore;
  export let timeoutMs = undefined;
  export let width = 'fit-content';

  const cn = 'osc-toast' + (className ? ' ' + className : '');
  const lines = message.split('\\n');
  const toastStyle = `--background-color: ${backgroundColor}; color: ${color}; width: ${width}`;

  let ref;
  let showToast = false;

  $: showToast = get($store, path);
  $: if (not) showToast = !showToast;
  $: if (showToast && timeoutMs) setTimeout(closeToast, timeoutMs);
  $: if (ref) {
    if (showToast) {
      ref.classList.add('show');
    } else {
      ref.classList.remove('show');
    }
  }

  function closeToast() {
    if (path && showToast) update(store, path, not);
    ref.classList.remove('show-toast');
    if (onClose) onClose();
  }
</script>

<div class={cn} bind:this={ref} style={toastStyle}>
  <button className="close" on:click={closeToast} type="button">
    &#10006;
  </button>
  {#each lines as line}
    <div>{line}</div>
  {/each}
</div>

<style>
  button {
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

  .heading-phrase {
    font-family: inherit;
    text-align: left;
  }

  .heading-phrase span {
    font-size: 1rem;
    line-height: 1.2rem;
  }

  .osc-toast {
    background-color: var(--background-color);
    font-family: var(--global-font-family, sans-serif);
    margin: 0;
    padding: 1rem 3rem 1rem 1rem;
    position: fixed;
    right: 0;
    top: -100%;
    transition-duration: 0.5s;
    transition-property: top;
    z-index: 2;
  }

  .osc-toast.show {
    top: 0;
  }

  @media (max-width: 760px) {
    .osc-toast {
      padding: 0.5rem 0;
    }
  }
</style>
