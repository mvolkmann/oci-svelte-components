<script>
  import {faFilter} from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher, getContext} from 'svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import TableFilterDescription from './TableFilterDescription.svelte';
  import TableFilterInputs from './TableFilterInputs.svelte';

  export let datePeriodFilters;
  export let loadData;
  export let pageSize;

  const filtersStore = getContext('filtersStore');

  const dispatch = createEventDispatcher();

  let selectedFilter = null;

  async function applyFilters() {
    selectedFilter.applied = true;
    $filtersStore[selectedFilter.index] = selectedFilter;
    await loadData();
    selectedFilter = null;
  }

  function getFilterButtonClasses(filter) {
    return (
      'filter-btn' +
      (filter && filter.applied ? ' applied' : '') +
      (filter === selectedFilter ? ' selected' : '')
    );
  }

  function reset() {
    selectedFilter = null;
    dispatch('reset');
  }

  function selectFilter(filter) {
    if (selectedFilter) $filtersStore[selectedFilter.index].selected = false;
    selectedFilter = filter;
    $filtersStore[selectedFilter.index].selected = true;
  }
</script>

<div class="filter-area">
  <div class="filter-description">
    <Icon
      color="var(--osc-secondary-color, orange)"
      icon={faFilter}
      size="1rem" />
    <div class="heading">
      <div class="label">Filters Applied:</div>
      <TableFilterDescription {loadData} on:reset={reset} {pageSize} />
    </div>
  </div>
  <div class="buttons">
    {#each $filtersStore as filter, index (filter.title + filter.applied + filter.selected)}
      <Button
        className={getFilterButtonClasses(filter)}
        on:click={() => selectFilter(filter)}
        primary={filter === selectedFilter}>
        {filter.title}
      </Button>
    {/each}
  </div>
  {#if selectedFilter}
    <form class="filter-inputs" on:submit|preventDefault={applyFilters}>
      <TableFilterInputs
        {datePeriodFilters}
        filter={selectedFilter}
        {loadData}
        on:reset={reset}
        {pageSize} />
      <Button className="apply" primary type="submit">Apply</Button>
    </form>
  {/if}
</div>

<style>
  .filter-area {
    margin-bottom: 0.5rem;
  }

  .filter-area :global(.filter-btn) {
    margin-bottom: 0;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    outline: none;
  }

  .filter-area :global(.applied) {
    background-color: var(--osc-table-filter-set-color, linen);
  }

  .filter-description {
    display: flex;
  }

  .filter-description :global(svg) {
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }

  .filter-inputs {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .filter-inputs :global(.apply) {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }

  .heading {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .heading > :global(button) {
    padding: 0;
  }

  .heading :global(button) {
    font-size: 0.8rem;
    margin-right: 0;
  }

  .heading .label {
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  .heading :global(.title) {
    font-weight: bold;
  }

  .heading > :global(.title) {
    text-align: left;
  }
</style>
