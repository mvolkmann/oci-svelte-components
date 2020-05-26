<script>
  import Select from './Select.svelte';
  import {getContext} from 'svelte';

  export let filter;
  export let key;
  export let options;

  const filtersStore = getContext('filtersStore');

  function onChange(event) {
    filter[key] = event.detail;
    $filtersStore[filter.index] = filter;
  }
</script>

<Select
  className="table-filter-select"
  on:blur={onChange}
  on:change={onChange}
  {options}
  value={filter[key] || ''} />

<style>
  :global(.osc-labeled.table-filter-select) {
    display: inline-flex;
  }
</style>
