<script>
  import LabeledSelect from './LabeledSelect.svelte';
  import canadaOptions from './canadian-provinces.json';
  import usOptions from './us-states.json';

  export let className = '';
  export let countryCode;
  export let placeholder = '';
  export let required = false;
  export let statePath;
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
    {placeholder}
    {required}
    {statePath}
    {vertical} />
{/if}
