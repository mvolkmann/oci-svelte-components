<script>
  import Info from './Info.svelte';

  export let id = '';
  export let info = '';
  export let required = false;
  export let text;
</script>

<label for={id} on:click>
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
    font-size: var(--osc-label-font-size, 1rem);
    font-weight: var(--osc-label-font-weight, bold);
  }

  .required {
    color: var(--osc-error-color, red);
    font-size: 1.2rem;
    line-height: 0.8rem;
    margin-left: 0.2rem;
    position: relative;
    top: 5px;
  }
</style>
