<script>
  import {setContext} from 'svelte';
  import {writable} from 'svelte/store';
  import Button from './Button.svelte';
  //import getComponent from './component-map';
  import {postJson} from './fetch-util';
  import Info from './Info.svelte';
  import MessageDialog, {error} from './MessageDialog.svelte';
  import TableFilterArea from './TableFilterArea.svelte';
  import TableHeading from './TableHeading.svelte';
  import TableRow from './TableRow.svelte';

  const defaultDatePeriodFilters = [
    {title: '3 mo', months: 3},
    {title: '6 mo', months: 6},
    {title: '9 mo', months: 9},
    {title: 'YTD', months: 12}
  ];

  export let breakpoint = undefined;
  export let className = '';
  export let dataUrl;
  export let datePeriodFilters = defaultDatePeriodFilters;
  export let defaultFilters = {};
  export let detailComponent = undefined;
  export let evenBgColor = 'white';
  export let filterAll = false;
  export let headings;
  export let headingBgColor = '#f2F2F2';
  export let headingTooltip;
  export let oddBgColor = '#f9f8f9';
  export let pageSize = 15;
  export let sortAll = false;

  const classes = 'osc-table' + (className ? ' ' + className : '');
  const thStyle = 'background-color: ' + headingBgColor;

  let ascending = true;
  let atEnd = false;
  let data = [];

  // This holds the currently opened detail row that can only be displayed
  // when the window width is less than the breakpoint value.
  // It must be maintained here so it can be
  // shared with all instances of TableRow.
  let detailTr = null;

  let dialogRef;
  let innerWidth;
  let rowCount = pageSize;
  let sortHeading = null;
  let startIndex = 0;

  $: mobile = breakpoint && innerWidth <= breakpoint;

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

  loadData();

  // It is important that startIndex and filters are passed in
  // rather than just using the state variables defined above!
  // There are calls to this that need to pass a different value
  // to get around the issue of state updates being asynchronous.
  async function loadData(startIndex = 0) {
    const body = {
      ascending,
      filters: $filtersStore.filter(f => f.applied),
      size: pageSize,
      startIndex
    };
    if (sortHeading) {
      body.sortOn = sortHeading.property;
      body.type = sortHeading.type || 'string';
    }

    try {
      const result = await postJson(dataUrl, body);
      atEnd = result.isLast;

      if (startIndex === 0) {
        data = result.records;
      } else {
        data.push(...result.records);
        data = data; // to trigger reactivity
      }
    } catch (e) {
      const title = 'Table failed to get data';
      const text = `${e.message} ${dataUrl}`;
      console.error('Table.svelte loadData:', text);
      error({dialogRef, text, title});
    }
  }

  async function loadMoreResults() {
    startIndex = rowCount;
    await loadData(startIndex);
    rowCount += pageSize;
  }

  function reset() {
    startIndex = 0;
    rowCount = pageSize;
  }
</script>

<svelte:window bind:innerWidth />

<div class={classes}>
  <TableFilterArea
    {datePeriodFilters}
    {filterAll}
    {loadData}
    on:reset={reset}
    {pageSize} />
  <table>
    <thead>
      <tr>
        {#each headings as heading}
          <TableHeading
            bind:ascending
            bind:sortHeading
            {heading}
            {loadData}
            {mobile}
            on:reset={reset}
            {pageSize}
            {sortAll}
            {thStyle} />
        {/each}
        {#if detailComponent && mobile}
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
          bgColor={rowIndex % 2 === 0 ? evenBgColor : oddBgColor}
          data={rowData}
          {detailComponent}
          bind:detailTr
          {headings}
          {mobile} />
      {/each}
    </tbody>
  </table>

  <Button
    className="more-btn"
    disabled={atEnd}
    on:click={loadMoreResults}
    primary>
    More
  </Button>
</div>

<MessageDialog bind:dialogRef />

<style>
  .osc-table {
    --set-background-color: linen;
    --transition-duration: 0.5s;
  }

  .osc-table :global(.more-btn) {
    margin-top: 1rem;
  }

  .osc-table :global(th) {
    position: sticky;
    top: 0;
    z-index: 1; /* so Icon components in data rows scroll below these */
  }

  table {
    border-collapse: collapse;
  }
</style>
