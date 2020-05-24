<script>
  import {getContext} from 'svelte';

  export let filter;
  export let key;
  export let options;
  export let property;

  const filtersStore = getContext('filtersStore');

  const handler = e => onChange(e, key, 'string');

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
    $filtersStore = {...$filtersStore, [property]: filter};
  }
</script>

<select on:blur={handler} on:change={handler} value={filter[key] || ''}>
  {#each options as option, index}
    <option key={'option' + index}>{option}</option>
  {/each}
</select>
