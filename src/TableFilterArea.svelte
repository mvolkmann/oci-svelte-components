<script>
  export let filters;
  export let headings;

  const anyFilters = headings.some(canFilterHeading);

  function filterToMonths(months) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    const value1 =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    reset();

    const newFilter = {
      applied: true,
      title: heading.title,
      type: 'date',
      operator1: '>=',
      property,
      value1
    };
    const newFilters = {...filters, [property]: newFilter};
    setFilters(newFilters);
    loadData(0, newFilters);
  }

  function getFilterButtonClasses(heading) {
    const isSelected = heading === filterHeading;
    const filter = filters[heading.property];
    if (filter) filter.title = heading.title;
    const isSet = filter && filter.applied;
    const classes =
      'filter-btn' + (isSelected ? ' selected' : '') + (isSet ? ' set' : '');
    return classes;
  }

  function getFilterInputs(heading) {
    if (!canFilterHeading(heading)) return null;

    const {property, type} = heading;
    let filter = filters[property];
    if (!filter) filter = {property, title: heading.title};

</script>

{#if anyFilters}
  <div class="filter-area">
    <div class="filter-description">
      <Icon color="var(--secondary-color)" icon="filter" />
      <div class="heading">
        <div class="label">Filters Applied</div>
        {getFilterDescription()}
      </div>
    </div>
    <div class="buttons">
      {#each headings as heading, index}
        {#if canFilterHeading(heading)}
          <button
            class={getFilterButtonClasses(heading)}
            key={'heading-' + index}
            on:click={() => setFilterHeading(heading)}>
            {heading.title}
          </button>
        {/if}
      {/each}
    </div>
    {#if filterHeading}
      <div class="filter-inputs">
        {getFilterInputs(filterHeading)}
        <button class="apply primary" on:click={applyFilters}>
          Apply
        </button>
      </div>
    {/if}
  </div>
{/if}
