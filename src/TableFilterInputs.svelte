<script>
  import TableFilterInput from './TableFilterInput.svelte';
  import TableFilterSelect from './TableFilterSelect.svelte';
  import TableToggleButton from './TableToggleButton.svelte';

  export let datePeriodFilters;
  export let filterAll;
  export let filters;
  export let heading;
  export let loadData;
  export let pageSize;

  const LEFT_RELATIONAL_OPERATORS = ['', '>', '>=', '=', '!='];
  const RIGHT_RELATIONAL_OPERATORS = ['', '<=', '<'];
  const STRING_OPERATORS = [
    '',
    'equals',
    'not equals',
    'contains',
    'starts with',
    'ends with'
  ];

  const {property, type} = heading;
  let filter = filters[property];
  if (!filter) filter = {property, title: heading.title};

  const canFilterHeading = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);

  function customRangeButtonClicked() {
    selectedButton = showCustomDateRange ? '' : 'Custom Date Range';
    showCustomDateRange = !showCustomDateRange;
  }

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
    filters = {...filters, [property]: newFilter};
    loadData(0, filters);
  }

  function monthButtonClicked(label, months) {
    selectedButton = label;
    filterToMonths(months);
  }

  function reset() {
    startIndex = 0;
    rowCount = pageSize;
  }
</script>

{#if canFilterHeading(heading)}
  {#if type === 'currency' || type === 'number'}
    <div>
      <div>
        <TableFilterSelect
          {filter}
          key="operator1"
          options={LEFT_RELATIONAL_OPERATORS} />
        {property}
        <TableFilterInput {filter} key="value1" {property} type="number" />
      </div>
      <div>
        <TableFilterSelect
          {filter}
          key="operator2"
          options={RIGHT_RELATIONAL_OPERATORS} />
        {property}
        <TableFilterInput {filter} key="value2" {property} type="number" />
      </div>
    </div>
  {:else if type === 'date'}
    <div>
      <div>
        {#if selectedButton !== 'Custom Date Range'}
          {#each datePeriodFilters as filter}
            <TableToggleButton
              label={filter.title}
              on:click={() => monthButtonClicked(filter.title, filter.months)} />
          {/each}
          <TableToggleButton
            label="Custom Date Range"
            on:click={customRangeButtonClicked} />
        {/if}
      </div>
      {#if showCustomDateRange}
        <div>
          <label class="date">
            Start Date
            <TableFilterInput {filter} key="value1" {property} type="date" />
          </label>
        </div>
        <div>
          <label class="date">
            End Date
            <TableFilterInput {filter} key="value2" {property} type="date" />
          </label>
        </div>
      {/if}
    </div>
  {:else}
    // assumes type is "string"
    <div>
      <div>
        <TableFilterSelect
          {filter}
          key="operator1"
          options={STRING_OPERATORS}
          {property} />
        <TableFilterInput {filter} key="value1" {property} />
      </div>
    </div>
  {/if}
{/if}
