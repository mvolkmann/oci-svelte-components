<script>
  import Info from './Info.svelte';

  export let className = '';
  export let info = '';
  export let required = false;
  export let text;
  export let vertical = false;

  const cn =
    'label' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');
</script>

<label class={cn}>
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

<style lang="scss">
  .label {
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

    div {
      display: block;
    }
  }
</style>
