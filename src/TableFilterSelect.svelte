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
  label={filter.title}
  on:blur={onChange}
  on:change={onChange}
  {options}
  value={filter[key] || ''} />
