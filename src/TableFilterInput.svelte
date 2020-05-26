<script>
  import {getContext} from 'svelte';

  export let filter;
  export let key;
  export let type = 'text';

  const filtersStore = getContext('filtersStore');

  let value = filter[key];
  if (!value) {
    value = type === 'date' ? new Date() : type === 'number' ? 0 : '';
  }

  function onChange(event, key, type) {
    filter[key] = event.currentTarget.value;
    filter.type = type;
    if (type === 'date') {
      if (key.endsWith('1')) {
        filter.operator1 = '>=';
      } else {
        filter.operator2 = '<=';
      }
    }
    $filtersStore[filter.index] = filter;
  }
</script>

<input {type} on:change={e => onChange(e, key, type)} {value} />

<style>
  input {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
</style>
