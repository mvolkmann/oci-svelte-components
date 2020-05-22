<script>
  import Button from './Button.svelte';
  //import getComponent from './component-map';
  import {postJson} from './fetch-util';
  import Icon from './Icon.svelte';
  import Info from './Info.svelte';
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

  const sortIconMap = {
    'currency-ascending': 'sort-numeric-down',
    'currency-descending': 'sort-numeric-down-alt',
    'date-ascending': 'sort-amount-down-alt',
    'date-descending': 'sort-amount-down',
    'number-ascending': 'sort-numeric-down',
    'number-descending': 'sort-numeric-down-alt',
    'string-ascending': 'sort-alpha-down',
    'string-descending': 'sort-alpha-down-alt'
  };

  let ascending = true;
  let atEnd = false;
  let data = [];
  let detailTr = null;
  let filters = markAsApplied(defaultFilters);
  let filterHeading = null;
  let rowCount = pageSize;
  let selectedButton = '';
  let showCustomDateRange = false;
  let sortHeading = null;
  let startIndex = 0;

  function markAsApplied(filterMap) {
    Object.values(filterMap).forEach(filter => (filter.applied = true));
    return filterMap;
  }

  // Putting this in a variable whose name starts uppercase
  // allows React to treat it as a component.
  const DetailComponent = !detailComponent
    ? null
    : typeof detailComponent === 'string'
    ? getComponent(detailComponent)
    : detailComponent;

  const thStyle = {backgroundColor: headingBgColor};

  const canFilterHeading = heading =>
    heading.canFilter || (filterAll && heading.canFilter === undefined);

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
    setAtEnd(isLastRecord);

    if (startIndex === 0) {
      setData(newData);
    } else {
      setData(data => data.concat(newData));
    }
  }

  if (ascending || sortHeading || startIndex || rowCount) {
    loadData(startIndex, filters);
  }

  function applyFilters() {
    Object.values(filters).forEach(filter => (filter.applied = true));
    setStartIndex(0);
    setFilterHeading(null);
    loadData(0, filters);
  }

  function formatValue(heading, obj) {
    const value = obj[heading.property];

    if (heading.type === 'currency') {
      const number = Number(value);
      return '$' + number.toFixed(2);
    }

    if (heading.type === 'date') {
      const date = new Date(value);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    return value;
  }

    function onChange(event, key, type) {
      filter[key] = event.currentTarget.value;
      filter.type = type;
      if (type === 'date') {
        if (key.endsWith('1')) {
          filter.operator1 = '>=';
        } else {
          filter.operator2 = '<=';
        }
      }
      setFilters({...filters, [property]: filter});
    }

    function getCustomRangeButton() {
      function onClick() {
        setSelectedButton(showCustomDateRange ? '' : 'Custom Date Range');
        setShowCustomDateRange(!showCustomDateRange);
      }
      return getToggleButton('Custom Date Range', onClick);
    }

    function getInput(key, type = 'text') {
      let value = getFilterValue(filter, key);
      if (!value) {
        value = type === 'date' ? new Date() : type === 'number' ? 0 : '';
      }
      return (
        <input
          type={type}
          onChange={e => onChange(e, key, type)}
          value={value}
        />
      );
    }

    function getMonthButton(label, months) {
      function onClick() {
        setSelectedButton(label);
        filterToMonths(months);
      }
      return getToggleButton(label, onClick);
    }

    function getToggleButton(label, onClick, className = '') {
      const classes =
        (label === selectedButton ? 'selected' : '') +
        (className ? ' ' + className : '');
      return (
        <button class={classes} key={label} on:click={onClick}>
          {label}
        </button>
      );
    }

    function getSelect(key, options) {
      const handler = e => onChange(e, key, 'string');
      return (
        <select
          onBlur={handler}
          onChange={handler}
          value={getFilterValue(filter, key) || ''}
        >
          {options.map((option, index) => (
            <option key={'option' + index}>{option}</option>
          ))}
        </select>
      );
    }

    if (type === 'currency' || type === 'number') {
      return (
        <div>
          <div>
            {getSelect('operator1', LEFT_RELATIONAL_OPERATORS)}
            {getInput('value1', 'number')}
          </div>
          <div>
            {getSelect('operator2', RIGHT_RELATIONAL_OPERATORS)}
            {getInput('value2', 'number')}
          </div>
        </div>
      );
    } else if (type === 'date') {
      return (
        <div>
          <div>
            {selectedButton !== 'Custom Date Range' &&
              datePeriodFilters.map(filter =>
                getMonthButton(filter.title, filter.months)
              )}
            {getCustomRangeButton()}
          </div>
          {showCustomDateRange && (
            <>
              <div>
                <label class="date">
                  Start Date {getInput('value1', 'date')}
                </label>
              </div>
              <div>
                <label class="date">
                  End Date {getInput('value2', 'date')}
                </label>
              </div>
            </>
          )}
        </div>
      );
    } else {
      // assumes type is "string"
      return (
        <div>
          <div>
            {getSelect('operator1', STRING_OPERATORS)}
            {getInput('value1', 'string')}
          </div>
        </div>
      );
    }
  }

  const getFilterValue = (filter, key) => filter[key];

  const getRowBgColor = index => index % 2 === 0 ? evenBgColor : oddBgColor;

  const getRowClass = index => index % 2 === 0 ? 'even' : 'odd';

  function loadMoreResults() {
    setStartIndex(rowCount);
    setRowCount(rowCount => rowCount + pageSize);
    // Keep current sortHeading and ascending values.
  }

  function reset() {
    setStartIndex(0);
    setRowCount(pageSize);
  }

  function showDetail(event) {
    // If a detail row is currently displayed, hide it.
    if (detailTr) {
      const tr = detailTr.previousSibling;
      if (tr) tr.classList.remove('show-detail');
    }

    // Find the row whose detail button was clicked.
    const button = event.currentTarget;
    const td = button.parentElement;
    if (!td) return;
    const tr = td.parentElement;
    if (!tr) return;

    // Find the detail row that immediately follows this row.
    const newDetailTr = tr.nextSibling;
    if (!newDetailTr) return;

    // If we clicked the detail icon of a row
    // whose detail is already displayed ...
    if (newDetailTr === detailTr) {
      detailTr = null;
      // We have already hidden it above.
      return;
    }

    // Open a new detail row.
    detailTr = newDetailTr;
    const detailTd = detailTr.firstChild;
    detailTd.setAttribute('colspan', '100%');
    tr.classList.add('show-detail');
  }

  function sortData(heading) {
    setStartIndex(0);
    setRowCount(pageSize); // reset to initial size
    setSortHeading(heading);
    setAscending(
      !sortHeading ? true : heading === sortHeading ? !ascending : true
    );
  }

  const classes = 'table' + (className ? ' ' + className : '');
</script>

<div class={classes}>
  <TableFilterArea {headings} />
  <table>
    <thead>
      <tr style={{backgroundColor: headingBgColor}}>
        {#each headings as heading}
          <TableHeading {heading} />
        {/each}
        {DetailComponent && (
          <th style={thStyle}>
            {headingTooltip && (
              <Info
                text={headingTooltip}
                hPosition="left"
                tipWidth="245px"
                vPosition="center"
              />
            )}
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {#each data as rowData}
      <TableRow data={rowData} {detailComponent} {headings} />
    </tbody>
  </table>
  <button
    class="more-btn primary"
    disabled={atEnd}
    on:click={loadMoreResults}
  >
    More Results
  </button>
</div>

<style>

.table {
  --set-background-color: linen;
  --transition-duration: 0.5s;

  & > button {
    border: none;
    margin-top: 1rem;
    padding: 0.5rem 2rem;
  }

  button.primary {
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

    > td > * {
      max-height: 0;
      transition-duration: var(--transition-duration);
      transition-property: max-height;
    }
  }

  tbody > tr {
    .detail-icon > svg {
      transition-duration: var(--transition-duration);
      transition-property: transform;
      transform: rotate(0deg);
    }

    &.show-detail {
      .detail-icon > svg {
        color: var(--primary-color);
        transform: rotate(90deg);
      }

      + .detail-tr {
        display: table-row;

        > td > * {
          max-height: 100vh;
        }
      }
    }

    .detail-icon > svg {
      color: lightgray;
    }
  }

  thead {
    .detail-icon > svg {
      color: var(--secondary-color);
    }

    .info {
      span {
        font-weight: 300;
      }
    }
  }

  .filter-area {
    button {
      background-color: white;
      border: solid var(--primary-color) 1px;
      color: var(--primary-color);

      &.selected {
        background-color: var(--primary-color);
        color: white;
      }

      &.set {
        background-color: var(--set-background-color);
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }

    .buttons {
      margin-bottom: 0.5rem;
      text-align: left;

      button {
        margin-top: 0.5rem;
      }
    }

    .filter-description {
      display: flex;

      .heading {
        font-weight: 300;
      }

      .icon {
        font-size: 0.5rem;
        margin-right: 0.5rem;
      }
    }

    .filter-inputs {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;

      & > div {
        text-align: left;

        & > div {
          margin-bottom: 0.5rem;

          button {
            margin-bottom: 0;
          }
        }
      }

      .apply {
        margin-bottom: 0.5rem;
      }
    }

    .heading {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      button {
        font-size: 0.8rem;
        margin-right: 0;
      }

      .label {
        font-size: 0.8rem;
        margin-right: 0.5rem;
      }

      .title {
        font-weight: bold;
      }
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
  }

  .heading {
    & > button {
      padding: 0;
    }

    & > .title {
      text-align: left;
    }
  }

  .more-btn:disabled {
    background-color: lightgray !important;
  }

  td {
    border: none;
    border-left: solid lightgray 1px;
    font-weight: 300;
    text-align: left;

    &:first-of-type {
      border-left: none;
    }
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
    z-index: 1; // so Icon components in data rows scroll below these

    & > .heading {
      display: flex;
      align-items: center;

      button {
        background-color: transparent;
        border: none;
        padding-left: 0;
      }

      .icon {
        font-size: 0.7rem;
        margin-left: 0.5rem;
      }
    }
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
}
</style>