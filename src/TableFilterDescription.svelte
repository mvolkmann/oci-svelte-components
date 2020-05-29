<script>
  import {faFilter} from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher, getContext} from 'svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let loadData;

  const dispatch = createEventDispatcher();

  const filtersStore = getContext('filtersStore');

  $: appliedFilters = Object.values($filtersStore).filter(f => f.applied);

  function clearAllFilters() {
    dispatch('reset');
    $filtersStore.map(clearFilter);
    loadData();
  }

  function clearFilter(filter) {
    const {index, property, title, type} = filter;

    // Create a new filter object that omits filtering data.
    $filtersStore[index] = {applied: false, index, property, title, type};

    dispatch('reset');
    loadData();
  }

  function getCondition(operator, value) {
    return operator && value !== undefined ? ` ${operator} ${value}` : '';
  }

  function getDescription(filter) {
    const desc1 = getCondition(filter.operator1, filter.value1);
    const desc2 = getCondition(filter.operator2, filter.value2);
    return desc2 ? desc1 + ' and ' + desc2 : desc1;
  }
</script>

{#if appliedFilters.length === 0}
  <div>none</div>
{:else}
  <div class="osc-table-filter-description">
    <Icon
      color="var(--osc-secondary-color, orange)"
      icon={faFilter}
      size="1rem" />
    <div class="label">Filters Applied:</div>
    <Button asLink on:click={clearAllFilters}>clear all</Button>

    {#each appliedFilters as filter, index}
      <span>&nbsp;/</span>
      <span class="title">&nbsp;{filter.title}&nbsp;</span>
      <span>{getDescription(filter)}&nbsp;</span>
      <Button asLink on:click={() => clearFilter(filter)}>clear</Button>
    {/each}
  </div>
{/if}

<style>
  .label {
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  .osc-table-filter-description {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .osc-table-filter-description :global(.as-link) {
    font-size: 0.8rem;
    margin: 0;
  }

  .osc-table-filter-description :global(svg) {
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }
</style>
