<script>
  import {getContext} from 'svelte';

  export let filter;
  export let property;
  export let type = 'text';

  const filtersStore = getContext('filtersStore');

  let value = filter[property];
  if (!value) {
    value = type === 'date' ? new Date() : type === 'number' ? 0 : '';
  }

  function onChange(event, property, type) {
    filter[property] = event.currentTarget.value;
    filter.type = type;
    if (type === 'date') {
      if (property.endsWith('1')) {
        filter.operator1 = '>=';
      } else {
        filter.operator2 = '<=';
      }
    }
    $filtersStore[filter.index] = filter;
  }
</script>

<input {type} on:change={e => onChange(e, property, type)} {value} />

<style>
  input {
    --color: lightgray;
    border: solid var(--color) 1px;
    border-radius: var(--osc-border-radius, 4px);
    font-size: 1rem;
    margin-right: 0.5rem;
    padding: 0.5rem;
  }
</style>
