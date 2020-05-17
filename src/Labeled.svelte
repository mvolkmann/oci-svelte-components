<script>
  import Label from './Label.svelte';

  export let className = '';
  export let id = '';
  export let info = '';
  export let label;
  export let onRight = false;
  export let required = false;
  export let vertical = false;
  export let width = '';

  //TODO: How does this ever get set to true?
  let focus = false;
  let ref;
  let style = {};

  $: classes =
    'labeled' +
    (className ? ' ' + className : '') +
    (focus ? ' focus' : '') +
    (onRight ? ' on-right' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;
</script>

<div bind:this={ref} class={classes}>
  {#if !onRight}
    <Label {id} {info} {required} text={label} />
  {/if}

  <slot />

  {#if onRight}
    <Label {id} {info} {required} text={label} />
  {/if}
</div>

<style>
  .labeled {
    display: flex;
    align-items: center;

    margin-bottom: 1rem;
  }

  .labeled:not(.on-right) > :global(label) {
    margin-right: 0.5rem;
  }

  .labeled.on-right > :global(label) {
    margin-left: 0.5rem;
  }

  .focus :global(label) {
    color: var(--secondary-color);
  }

  .vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  .vertical :global(label) {
    margin-bottom: 0.5rem;
  }

  .vertical > label + * {
    margin-left: 0;
  }
</style>
