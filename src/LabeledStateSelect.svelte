<script>
  import LabeledSelect from './LabeledSelect.svelte';
  import canadaOptions from './canadian-provinces';
  import usOptions from './us-states';

  export let className = '';
  export let countryCode;
  export let path = undefined;
  export let placeholder = '';
  export let required = false;
  export let store = undefined;
  export let vertical = false;

  $: label =
    countryCode === 'USA' ? 'State' : countryCode === 'CAN' ? 'Province' : '';

  $: options =
    countryCode === 'USA'
      ? usOptions
      : countryCode === 'CAN'
      ? canadaOptions
      : [];
</script>

{#if label}
  <LabeledSelect
    {className}
    {label}
    {options}
    {path}
    {placeholder}
    {required}
    {store}
    {vertical} />
{/if}
