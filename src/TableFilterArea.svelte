<script>
  import {createEventDispatcher, getContext} from 'svelte';
  import Icon from './Icon.svelte';
  import TableFilterDescription from './TableFilterDescription.svelte';
  import TableFilterInputs from './TableFilterInputs.svelte';

  export let datePeriodFilters;
  export let filterAll;
  export let headings;
  export let loadData;
  export let pageSize;

  const filtersStore = getContext('filtersStore');

  const dispatch = createEventDispatcher();

  const anyFilters = headings.some(canFilterHeading);

  let filterHeading = null;

  function applyFilters() {
    Object.values($filtersStore).forEach(filter => (filter.applied = true));
    filterHeading = null;
    loadData(0, $filtersStore);
  }

  const canFilterHeading = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);

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
      <Icon color="var(--secondary-color)" icon="filter" />
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
            key={'heading-' + index}
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
