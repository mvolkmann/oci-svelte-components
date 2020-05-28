<script>
  import {createEventDispatcher, getContext} from 'svelte';
  import TableFilterInput from './TableFilterInput.svelte';
  import TableFilterSelect from './TableFilterSelect.svelte';
  import TableToggleButton from './TableToggleButton.svelte';

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
      <TableFilterInput {filter} property="value1" type="number" />
    </div>
    <div class="row">
      <TableFilterSelect
        {filter}
        key="operator2"
        options={RIGHT_RELATIONAL_OPERATORS} />
      <TableFilterInput {filter} property="value2" type="number" />
    </div>
  {:else if type === 'date'}
    <div class="row">
      {#each datePeriodFilters as dpf}
        <TableToggleButton
          label={dpf.title}
          on:click={() => monthButtonClicked(dpf.title, dpf.months)}
          selectedLabel={filter.selectedLabel} />
      {/each}
      <TableToggleButton
        label="Custom Date Range"
        on:click={customRangeButtonClicked}
        selectedLabel={filter.selectedLabel} />
    </div>
    {#if showCustomDateRange}
      <div class="row">
        <label class="date">
          Start Date
          <TableFilterInput {filter} property="value1" type="date" />
        </label>
        <label class="date">
          End Date
          <TableFilterInput {filter} property="value2" type="date" />
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
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  .table-filter-inputs :global(.osc-labeled) {
    margin-bottom: 0;
  }

  .table-filter-inputs .row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
