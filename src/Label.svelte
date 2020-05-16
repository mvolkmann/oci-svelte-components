<script>
  import Info from './Info.svelte';

  export let className = '';
  export let id = '';
  export let info = '';
  export let required = false;
  export let text;
  export let vertical = false;

  const classes = (className ? className : '') + (vertical ? ' vertical' : '');
</script>

<label class={classes} for={id}>
  <div>
    {text}
    {#if required}
      <span class="required">*</span>
    {/if}
  </div>
  {#if info}
    <Info text={info} />
  {/if}
  <slot />
</label>

<style>
  label {
    font-size: var(--label-font-size, 1rem);
    font-weight: var(--label-font-weight, bold);
  }

  div {
    display: inline-block;
  }

  .required {
    color: var(--error-color, red);
    margin-left: 0.2rem;
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  .vertical div {
    display: block;
  }
</style>
