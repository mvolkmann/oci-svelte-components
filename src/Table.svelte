<script>
  import {setContext} from 'svelte';
  import {writable} from 'svelte/store';
  //import getComponent from './component-map';
  import {postJson} from './fetch-util';
  import Info from './Info.svelte';
  import TableFilterArea from './TableFilterArea.svelte';
  import TableHeading from './TableHeading.svelte';
  import TableRow from './TableRow.svelte';

  const defaultDatePeriodFilters = [
    {title: '3 mo', months: 3},
    {title: '6 mo', months: 6},
    {title: '9 mo', months: 9},
    {title: 'YTD', months: 12}
  ];

  export let className = '';
  export let datePeriodFilters = defaultDatePeriodFilters;
  export let defaultFilters = {};
  export let detailComponent;
  export let evenBgColor = 'white';
  export let filterAll = false;
  export let getUrl;
  export let headings;
  export let headingBgColor = '#f2F2F2';
  export let headingTooltip;
  export let oddBgColor = '#f9f8f9';
  export let pageSize = 15;
  export let sortAll = false;

  const classes = 'table' + (className ? ' ' + className : '');
  const thStyle = 'background-color: ' + headingBgColor;

  let ascending = true;
  let atEnd = false;
  let data = [];
  let detailTr = null;
  let rowCount = pageSize;
  let sortHeading = null;
  let startIndex = 0;

  const canFilter = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);

  let filtersStore = writable(
    headings.filter(canFilter).map((heading, index) => {
      const defaultFilter = defaultFilters[heading.property];
      return {
        applied: Boolean(defaultFilter),
        index,
        property: heading.property,
        title: heading.title,
        type: heading.type,
        ...defaultFilter
      };
    })
  );

  setContext('filtersStore', filtersStore);

  if (ascending || sortHeading || startIndex || rowCount) {
    loadData(startIndex);
  }

  // It is important that startIndex and filters are passed in
  // rather than just using the state variables defined above!
  // There are calls to this that need to pass a different value
  // to get around the issue of state updates being asynchronous.
  async function loadData(startIndex = 0) {
    const body = {
      ascending,
      filters: $filtersStore.filter(f => f.applied),
      size: pageSize,
      start: startIndex
    };
    if (sortHeading) {
      body.sortOn = sortHeading.property;
      body.type = sortHeading.type || 'string';
    }
    const result = await postJson(getUrl, body);
    const newData = result.records;
    const isLastRecord = result.isLast;
    atEnd = isLastRecord;

    if (startIndex === 0) {
      data = newData;
    } else {
      data.push(...newData);
      data = data; // to trigger reactivity
    }
  }

  function loadMoreResults() {
    startIndex = rowCount;
    rowCount += pageSize;
    // Keep current sortHeading and ascending values.
  }

  function reset() {
    startIndex = 0;
    rowCount = pageSize;
  }
</script>

<div class={classes}>
  <TableFilterArea {datePeriodFilters} {filterAll} {loadData} {pageSize} />
  <table>
    <thead>
      <tr style={`backgroundColor: ${headingBgColor}`}>
        {#each headings as heading}
          <TableHeading
            {heading}
            on:reset={reset}
            {pageSize}
            {sortAll}
            {thStyle} />
        {/each}
        {#if detailComponent}
          <th style={thStyle}>
            {#if headingTooltip}
              <Info
                text={headingTooltip}
                hPosition="center"
                tipWidth="340px"
                vPosition="bottom" />
            {/if}
          </th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each data as rowData, rowIndex}
        <TableRow
          data={rowData}
          {detailComponent}
          bind:detailTr
          {evenBgColor}
          {headings}
          {oddBgColor}
          {rowIndex} />
      {/each}
    </tbody>
  </table>
  <button class="more-btn primary" disabled={atEnd} on:click={loadMoreResults}>
    More Results
  </button>
</div>

<style>
  button {
    margin-right: 0.5rem;
  }

  .buttons {
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .buttons button {
    margin-top: 0.5rem;
  }

  .detail-td {
    padding: 0;
  }

  .more-btn:disabled {
    background-color: lightgray !important;
  }

  table {
    border-collapse: collapse;
  }

  .table {
    --set-background-color: linen;
    --transition-duration: 0.5s;
  }

  .table > button {
    border: none;
    margin-top: 1rem;
    padding: 0.5rem 2rem;
  }

  .table > button.primary {
    background-color: var(--osc-primary-color, cornflowerblue) !important;
    border: none !important;
    color: white !important;
  }

  th {
    border: none;
    font-weight: normal;
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 1; /* so Icon components in data rows scroll below these */
  }

  @media (max-width: 760px) {
    .filter-inputs button {
      font-size: 0.8rem;
    }

    .info > button {
      padding: 0;
    }

    th {
      padding: 0.5rem 0.25rem;
    }
  }
</style>
