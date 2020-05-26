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

  let activeFilter = null;

  function applyFilters() {
    activeFilter.applied = true;
    $filtersStore[activeFilter.index] = activeFilter;
    activeFilter = null;
    loadData();
  }

  function getFilterButtonClasses(filter) {
    const isApplied = filter && filter.applied;
    const isSelected = filter === activeFilter;
    return (
      'filter-btn ' +
      (isApplied ? ' applied' : '') +
      (isSelected ? ' selected' : '')
    );
  }

  function reset() {
    activeFilter = null;
    dispatch('reset');
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
    {#each $filtersStore as filter, index}
      <Button
        className={getFilterButtonClasses(filter)}
        on:click={() => (activeFilter = filter)}>
        {filter.title}
      </Button>
    {/each}
  </div>
  {#if activeFilter}
    <div class="filter-inputs">
      <TableFilterInputs
        {datePeriodFilters}
        filter={activeFilter}
        {loadData}
        on:reset={reset}
        {pageSize} />
      <Button className="apply primary" on:click={applyFilters}>Apply</Button>
    </div>
  {/if}
</div>

<style>
  .filter-area {
    margin-bottom: 0.5rem;
  }

  .filter-area :global(.osc-button:not(.as-link)) {
    margin-right: 0.5rem;
  }

  .filter-area :global(.osc-button.applied) {
    /*TODO: Where is this var set? */
    background-color: var(--set-background-color);
  }

  .filter-area :global(.osc-button.selected) {
    background-color: var(--osc-primary-color, cornflowerblue);
    color: white;
  }

  .filter-area .buttons {
    margin-top: 0.5rem;
  }

  .filter-description {
    display: flex;
  }

  .filter-description :global(.osc-icon) {
    font-size: 0.5rem;
    margin-right: 0.5rem;
  }

  .filter-inputs {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .filter-inputs :global(.apply) {
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
