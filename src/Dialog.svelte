<script>
  /**
   * Creates a Dialog that can have a title and any content.
   * A ref must be passed via the `dialogRef` prop.
   * This is used by the caller to open and close the dialog.
   * The dialog is initially closed.
   *
   * To open the dialog as a modal, `dialogRef.current.showModal()`.
   * This does not allow interaction with elements outside the dialog.
   *
   * To open the dialog as a non-modal, `dialogRef.current.show()`.
   * This allows interaction with elements outside the dialog.
   *
   * To close the dialog, `dialogRef.current.close()`.
   *
   * @param {boolean} canClose - boolean that determines whether
   *   a close "X" should appear (defaults to true)
   * @param {string} className - CSS class name to apply to dialog element
   * @param {ReactElement} icon - an icon to display before the title
   * @param {function} onClose - a function to call when the dialog is closed
   * @param {string} title - to display in the dialog header
   */

  //TODO: Importing this causes Jest tests to fail,
  //TODO: but it may be needed in older browsers!
  //import dialogPolyfill from 'dialog-polyfill';
  import {onMount} from 'svelte';
  import Icon from './Icon.svelte';

  export let canClose = true;
  export let className = '';
  export let icon = undefined;
  export let onClose;
  export let ref;
  export let title;

  const classes = 'dialog' + (className ? ' ' + className : '');

  onMount(() => {
    //dialogPolyfill.registerDialog(dialogRef);
    if (onClose) ref.addEventListener('close', () => onClose());
  });

  function close() {
    ref.close();
    if (onClose) onClose();
  }
</script>

<dialog bind:this={ref} class={classes}>
  {#if title}
    <header>
      <Icon color="white" {icon} />
      <div class="title">{title}</div>
      {#if canClose}
        <button class="close-btn" on:click={close} type="button">
          &#x2716;
        </button>
      {/if}
    </header>
  {/if}
  <section className="body">
    <slot />
  </section>
</dialog>

<style>
  .body {
    padding: 0.625rem;
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    margin-left: var(--space);
    outline: none;
    padding: 0;
  }

  .close-btn:hover {
    color: lightgray;
  }

  dialog {
    --space: 1rem;

    /* These properties center the dialog in the browser window. */
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);

    border: none;
    box-shadow: 0 0 10px darkgray;
    padding: 0;
  }

  .dialog > header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: cornflowerblue;
    box-sizing: border-box;
    padding: var(--space);
    width: 100%;
  }

  .dialog > header > :global(.osc-icon) {
    margin-right: var(--space);
  }

  .dialog > header > .title {
    display: flex;
    align-items: center;
    color: white;
    font-size: var(--dialog-title-font-size, 1.5rem);
    font-weight: bold;
    margin-right: 1.25rem;
    padding: 0;
  }

  .error-dialog header {
    background-color: var(
      --osc-dialog-error-color,
      var(--osc-error-color, red)
    );
  }

  .error-dialog .title {
    color: white;
  }

  .dialog > section {
    padding: var(--space);
    margin: 0;
  }

  ::backdrop, /* for native <dialog> */
  dialog + .backdrop /* for dialog-polyfill */ {
    /* a transparent shade of gray */
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
