<script>
  import Info from './Info.svelte';

  export let id = '';
  export let info = '';
  export let required = false;
  export let text;
</script>

<label for={id}>
  {text}
  {#if required}
    <span class="required">*</span>
  {/if}
  {#if info}
    <Info text={info} />
  {/if}
</label>

<style>
  label {
    font-size: var(--label-font-size, 1rem);
    font-weight: var(--label-font-weight, bold);
  }

  .required {
    color: var(--error-color, red);
    margin-left: 0.2rem;
  }
</style>
