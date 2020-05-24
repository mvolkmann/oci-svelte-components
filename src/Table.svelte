<script>
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

  let ascending = true;
  let atEnd = false;
  let data = [];
  let detailTr = null;
  let filters = markAsApplied(defaultFilters);
  let filterHeading = null;
  let rowCount = pageSize;
  let sortHeading = null;
  let startIndex = 0;

  const classes = 'table' + (className ? ' ' + className : '');
  const thStyle = 'backgroundColor: ' + headingBgColor;

  if (ascending || sortHeading || startIndex || rowCount) {
    loadData(startIndex, filters);
  }

  // It is important that startIndex and filters are passed in
  // rather than just using the state variables defined above!
  // There are calls to this that need to pass a different value
  // to get around the issue of state updates being asynchronous.
  async function loadData(startIndex, filters) {
    const body = {
      ascending,
      filters,
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

  function markAsApplied(filterMap) {
    Object.values(filterMap).forEach(filter => (filter.applied = true));
    return filterMap;
  }

  function reset() {
    filterHeading = null;
    startIndex = 0;
    rowCount = pageSize;
  }
</script>

<div class={classes}>
  <TableFilterArea
    {datePeriodFilters}
    {filterAll}
    {headings}
    {loadData}
    {pageSize} />
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
                hPosition="left"
                tipWidth="245px"
                vPosition="center" />
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
    background-color: var(--primary-color) !important;
    border: none !important;
    color: white !important;
  }

  .detail-icon {
    font-size: 1rem;
  }

  .detail-td {
    padding: 0;
  }

  .detail-tr {
    display: none;
  }

  .detail-tr > td > * {
    max-height: 0;
    transition-duration: var(--transition-duration);
    transition-property: max-height;
  }

  tbody > tr .detail-icon > svg {
    transition-duration: var(--transition-duration);
    transition-property: transform;
    transform: rotate(0deg);
  }

  tbody > tr.show-detail .detail-icon > svg {
    color: var(--primary-color);
    transform: rotate(90deg);
  }

  tbody > tr + .detail-tr {
    display: table-row;
  }

  tbody > tr + .detail-tr > td > * {
    max-height: 100vh;
  }

  .detail-icon > svg {
    color: lightgray;
  }

  thead .detail-icon > svg {
    color: var(--secondary-color);
  }

  thead .info span {
    font-weight: 300;
  }

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

  .buttons {
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .buttons button {
    margin-top: 0.5rem;
  }

  .filter-description {
    display: flex;
  }

  .filter-description .heading {
    font-weight: 300;
  }

  .filter-description .icon {
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

  .heading button {
    font-size: 0.8rem;
    margin-right: 0;
  }

  .heading .label {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }

  .heading .title {
    font-weight: bold;
  }

  button,
  input,
  select {
    margin-right: 0.5rem;
  }

  input {
    font-size: 1rem;
  }

  select {
    box-sizing: border-box;
    height: 38px;
  }

  .heading > button {
    padding: 0;
  }

  .heading > .title {
    text-align: left;
  }

  .more-btn:disabled {
    background-color: lightgray !important;
  }

  td {
    border: none;
    border-left: solid lightgray 1px;
    font-weight: 300;
    text-align: left;
  }

  td:first-of-type {
    border-left: none;
  }

  td.currency,
  td.number {
    text-align: right;
  }

  td.date,
  td.info {
    text-align: center;
  }

  td.info > button {
    background-color: transparent;
    border: none;
    color: lightgray;
    outline: none;
  }

  th {
    border: none;
    font-weight: normal;
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 1; /* so Icon components in data rows scroll below these */
  }

  th > .heading {
    display: flex;
    align-items: center;
  }

  th > .heading button {
    background-color: transparent;
    border: none;
    padding-left: 0;
  }

  th > .heading .icon {
    font-size: 0.7rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 760px) {
    .filter-inputs button {
      font-size: 0.8rem;
    }

    .heading > .title {
      font-size: 0.7rem;
    }

    .info > button {
      padding: 0;
    }

    td {
      font-size: 0.7rem;
    }

    th {
      padding: 0.5rem 0.25rem;
    }
  }
</style>
