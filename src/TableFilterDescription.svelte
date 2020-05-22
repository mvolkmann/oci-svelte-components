<script>
  import Button from './Button.svelte';

  export let filters;

  const appliedFilters = Object.values(filters).filter(f => f.applied);

  function clearAllFilters() {
    reset();
    setFilterHeading(null);
    setFilters({});
    loadData(0, {});
  }

  function clearThisFilter(property) {
    reset();
    setFilterHeading(null);
    const newFilters = {...filters};
    delete newFilters[property];
    setFilters(newFilters);
    loadData(0, newFilters);
  }

  function getCondition(operator, value) {
    return operator && value !== undefined ? ` ${operator} ${value}` : '';
  }

  function getDescription(filter) {
    let description = getCondition(filter.operator1, filter.value1);
    description += getCondition(filter.operator2, filter.value2);
    return description;
  }
</script>

{#if appliedFilters.length === 0}
  <div>none</div>
{:else}
  <span key="left-all">(</span>
  <Button asLink key="btn-all" label="clear all" on:click={clearAllFilters} />
  <span key="right-all">):</span>

  {#each appliedFilters as filter, index}
    {#if index > 0}
      <span>&nbsp;/</span>
    {/if}
    <span class="title" key={'title' + index}>&nbsp;{filter.title}&nbsp;</span>
    <span key={'left' + index}>{getDescription(filter)}&nbsp;(</span>
    <Button asLink label="clear" />
    key={'btn' + index} on:click={() => clearThisFilter(filter.property)}
    <span key={'right' + index}>)</span>
  {/each}
{/if}
