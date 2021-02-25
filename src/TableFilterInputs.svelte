<script>
  import {createEventDispatcher, getContext} from 'svelte';
  import Button from './Button.svelte';
  import TableFilterInput from './TableFilterInput.svelte';
  import TableFilterSelect from './TableFilterSelect.svelte';

  export let datePeriodFilters;
  export let filter;
  export let loadData;

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

  const filtersStore = getContext('filtersStore');

  let dispatch = createEventDispatcher();
  let showCustomDateRange = false;

  $: ({property, title, type} = filter);

  function customRangeButtonClicked() {
    showCustomDateRange = !showCustomDateRange;
    filter.selectedLabel = showCustomDateRange ? 'Custom Date Range' : '';
    $filtersStore[filter.index] = filter;
  }

  function monthButtonClicked(label, months) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    const value1 =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    dispatch('reset');

    filter.applied = true;
    filter.operator1 = '>=';
    filter.value1 = value1;
    filter.selectedLabel = label;

    $filtersStore[filter.index] = filter;

    loadData();
  }
</script>

<div class="table-filter-inputs">
  {#if type === 'currency' || type === 'number'}
    <div class="row">
      <TableFilterSelect
        {filter}
        key="operator1"
        options={LEFT_RELATIONAL_OPERATORS} />
      <TableFilterInput {filter} property="value1" />
    </div>
    <div class="row">
      <TableFilterSelect
        {filter}
        key="operator2"
        options={RIGHT_RELATIONAL_OPERATORS} />
      <TableFilterInput {filter} property="value2" />
    </div>
  {:else if type === 'date'}
    <div class="row">
      {#each datePeriodFilters as dpf}
        <Button
          className={filter.selectedLabel === dpf.title ? 'selected' : ''}
          on:click={() => monthButtonClicked(dpf.title, dpf.months)}>
          {dpf.title}
        </Button>
      {/each}
      <Button
        className={filter.selectedLabel === 'Custom Date Range' ? 'selected' : ''}
        on:click={customRangeButtonClicked}>
        Custom Date Range
      </Button>
    </div>
    {#if showCustomDateRange}
      <div class="row">
        <label class="date" for="start-date">
          Start Date
          <TableFilterInput {filter} property="value1" />
        </label>
        <label class="date" for="end-date">
          End Date
          <TableFilterInput {filter} property="value2" />
        </label>
      </div>
    {/if}
  {:else}
    <!-- assumes type is "string" -->
    <div class="row">
      <TableFilterSelect
        {filter}
        key="operator1"
        options={STRING_OPERATORS}
        {property} />
      <TableFilterInput {filter} property="value1" />
    </div>
  {/if}
</div>

<style>
  .table-filter-inputs :global(button),
  .table-filter-inputs :global(.table-filter-input),
  .table-filter-inputs :global(.table-filter-select) {
    margin: 0.5rem 0.5rem 0 0;
  }

  .table-filter-inputs :global(.osc-labeled) {
    margin-bottom: 0;
  }

  .table-filter-inputs .row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
