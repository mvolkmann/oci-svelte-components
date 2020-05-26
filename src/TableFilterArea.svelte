<script>
  import {faFilter} from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher, getContext} from 'svelte';
  import Icon from './Icon.svelte';
  import TableFilterDescription from './TableFilterDescription.svelte';
  import TableFilterInputs from './TableFilterInputs.svelte';

  export let datePeriodFilters;
  export let loadData;
  export let pageSize;

  const filtersStore = getContext('filtersStore');
  $: filters = Object.values($filtersStore);

  const dispatch = createEventDispatcher();

  let buttons = null;
  let activeFilter = null;

  function applyFilters() {
    activeFilter.applied = true;
    $filtersStore[activeFilter.index] = activeFilter;
    activeFilter = null;

    const selectedButton = buttons.querySelector('.selected');
    selectedButton.classList.remove('selected');
    selectedButton.classList.add('applied');

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
  <div bind:this={buttons} class="buttons">
    {#each filters as filter, index}
      <button
        class={getFilterButtonClasses(filter)}
        on:click={() => (activeFilter = filter)}>
        {filter.title}
      </button>
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
      <button class="apply primary" on:click={applyFilters}>Apply</button>
    </div>
  {/if}
</div>

<style>
  .filter-area button {
    background-color: white;
    border: solid var(--osc-primary-color, cornflowerblue) 1px;
    border-radius: var(--osc-border-radius, 4px);
    color: var(--osc-primary-color, cornflowerblue);
    font-size: 1rem;
    margin-right: 0.5rem;
    padding: 0.5rem;
  }

  .filter-area button.applied {
    background-color: var(--set-background-color);
    border-color: var(--osc-primary-color, cornflowerblue);
    color: var(--osc-primary-color, cornflowerblue);
  }

  .filter-area button.selected {
    background-color: var(--osc-primary-color, cornflowerblue);
    color: white;
  }

  .filter-area .buttons {
    margin: 0.5rem 0;
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

  .filter-inputs > div {
    text-align: left;
  }

  .filter-inputs > div > div {
    margin-bottom: 0.5rem;
  }

  .filter-inputs > div button {
    margin-bottom: 0;
  }

  .filter-inputs .apply {
    margin-bottom: 0.5rem;
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
