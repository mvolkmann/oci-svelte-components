<script>
  import {faFilter} from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher, getContext} from 'svelte';
  import Icon from './Icon.svelte';
  import TableFilterDescription from './TableFilterDescription.svelte';
  import TableFilterInputs from './TableFilterInputs.svelte';
  console.log('TableFilterArea.svelte x: faFilter =', faFilter);

  export let datePeriodFilters;
  export let filterAll;
  export let headings;
  export let loadData;
  export let pageSize;

  const filtersStore = getContext('filtersStore');

  const dispatch = createEventDispatcher();

  const canFilterHeading = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);
  const anyFilters = headings.some(canFilterHeading);

  let filterHeading = null;

  function applyFilters() {
    Object.values($filtersStore).forEach(filter => (filter.applied = true));
    filterHeading = null;
    loadData(0, $filtersStore);
  }

  function getFilterButtonClasses(heading) {
    const isSelected = heading === filterHeading;
    const filter = $filtersStore[heading.property];
    if (filter) filter.title = heading.title;
    const isSet = filter && filter.applied;
    const classes =
      'filter-btn' + (isSelected ? ' selected' : '') + (isSet ? ' set' : '');
    return classes;
  }

  function reset() {
    filterHeading = null;
    dispatch('reset');
  }
</script>

{#if anyFilters}
  <div class="filter-area">
    <div class="filter-description">
      <Icon color="var(--secondary-color)" icon={faFilter} />
      <div class="heading">
        <div class="label">Filters Applied</div>
        <TableFilterDescription {loadData} on:reset={reset} {pageSize} />
      </div>
    </div>
    <div class="buttons">
      {#each headings as heading, index}
        {#if canFilterHeading(heading)}
          <button
            class={getFilterButtonClasses(heading)}
            on:click={() => (filterHeading = heading)}>
            {heading.title}
          </button>
        {/if}
      {/each}
    </div>
    {#if filterHeading}
      <div class="filter-inputs">
        <TableFilterInputs
          {datePeriodFilters}
          {filterAll}
          {filterHeading}
          {loadData}
          on:reset={reset}
          {pageSize} />
        <button class="apply primary" on:click={applyFilters}>Apply</button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .filter-area button {
    background-color: white;
    border: solid var(--primary-color) 1px;
    color: var(--primary-color);
  }

  .filter-area button.selected {
    background-color: var(--primary-color);
    color: white;
  }

  .filter-area button.set {
    background-color: var(--set-background-color);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  .filter-description {
    display: flex;
  }

  .filter-description :global(.icon) {
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
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }

  .heading :global(.title) {
    font-weight: bold;
  }

  .heading > :global(.title) {
    text-align: left;
  }
</style>
