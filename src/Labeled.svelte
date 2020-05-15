<script>
  import Info from './Info.svelte';
  import Label from './Label.svelte';

  export let className = '';
  export let id = '';
  export let info = '';
  export let label;
  export let onLeft = true;
  export let required = false;
  export let style = {};
  export let vertical = false;
  export let width = '';

  let focus = false;
  let ref;

  $: classes =
    'labeled' +
    (className ? ' ' + className : '') +
    (focus ? ' focus' : '') +
    (vertical ? ' vertical' : '');

  if (width) style.width = width;
</script>

<div bind:this={ref} class={classes}>
  {#if onLeft}
    <Label {id} {required} text={label}>
      {#if info}
        <Info text={info} />
      {/if}
    </Label>
  {/if}

  <slot />

  {#if !onLeft}
    <Label {id} {required} text={label}>
      {#if info}
        <Info text={info} />
      {/if}
    </Label>
  {/if}
</div>

<style lang="scss">
  .labeled {
    display: flex;
    align-items: center;

    margin-bottom: 1rem;

    .focus {
      input {
        outline: solid var(--secondary-color) 2px;
      }

      .label {
        color: var(--secondary-color);
      }
    }

    &.invalid {
      label {
        color: var(--error-color, red);
      }
    }

    input {
      border: solid lightgray 1px;
      font-size: 1rem;
      margin-bottom: 0;
      margin-left: 0.5rem;
      padding: 0.5rem;

      &:invalid {
        border: solid var(--error-color, red) 1px;
      }

      // For checkboxes and radio buttons where the label is on the right side,
      // add a bit of space between them.
      & + label {
        margin-left: 0.3rem;
      }
    }

    .required {
      font-size: 1.2rem;
      line-height: 14px;
      margin-left: 5px;
      position: relative;
      top: 5px;
    }

    &.vertical {
      flex-direction: column;
      align-items: flex-start;

      input {
        margin-left: 0;
        margin-top: 0.2rem;
      }
    }
  }
</style>
