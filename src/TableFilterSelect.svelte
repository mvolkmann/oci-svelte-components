<script>
  export let filter;
  export let key;
  export let options;

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
    filters = {...filters, [property]: filter};
  }
</script>

<select on:blur={handler} on:change={handler} value={filter[key] || ''}>
  {#each options as option, index}
    <option key={'option' + index}>{option}</option>
  {/each}
</select>
