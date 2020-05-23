<script>
  import Icon from './Icon.svelte';
  import TableFilterDescription from './TableFilterDescription.svelte';
  import TableFilterInputs from './TableFilterInputs.svelte';

  export let filters;
  export let headings;

  const anyFilters = headings.some(canFilterHeading);

  const canFilterHeading = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);

  function getFilterButtonClasses(heading) {
    const isSelected = heading === filterHeading;
    const filter = filters[heading.property];
    if (filter) filter.title = heading.title;
    const isSet = filter && filter.applied;
    const classes =
      'filter-btn' + (isSelected ? ' selected' : '') + (isSet ? ' set' : '');
    return classes;
  }
</script>

{#if anyFilters}
  <div class="filter-area">
    <div class="filter-description">
      <Icon color="var(--secondary-color)" icon="filter" />
      <div class="heading">
        <div class="label">Filters Applied</div>
        <TableFilterDescription {filters} />
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
        <TableFilterInputs {filterHeading} />
        <button class="apply primary" on:click={applyFilters}>Apply</button>
      </div>
    {/if}
  </div>
{/if}
