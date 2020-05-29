<script>
  import {getContext} from 'svelte';

  export let filter;
  export let property;

  const filtersStore = getContext('filtersStore');

  $: type = filter.type;
  $: value =
    filter[property] ||
    (type === 'date' ? new Date() : type === 'number' ? 0 : '');

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
    border: solid var(--osc-border-color, lightgray) 1px;
    border-radius: var(--osc-border-radius, 4px);
    font-size: 1rem;
    margin: 0.5rem 0.5rem 0 0;
    padding: 0.5rem;
  }
</style>
