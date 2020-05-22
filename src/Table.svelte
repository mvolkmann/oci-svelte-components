<script>
  import Button from './Button.svelte';
  //import getComponent from './component-map';
  import {postJson} from './fetch-util';
  import Icon from './Icon.svelte';
  import Info from './Info.svelte';

  const defaultDatePeriodFilters = [
    {title: '3 mo', months: 3},
    {title: '6 mo', months: 6},
    {title: '9 mo', months: 9},
    {title: 'YTD', months: 12}
  ];

  export let applyLabel = 'Apply';
  export let className = '';
  export let clearAllLabel = 'clear all';
  export let clearThisLabel = 'clear';
  export let containsLabel = 'contains';
  export let customDateRangeLabel = 'Custom Date Range';
  export let datePeriodFilters = defaultDatePeriodFilters;
  export let defaultFilters = {};
  export let descriptionText = 'Description';
  export let detailComponent;
  export let endDateText = 'End Date';
  export let endsWithLabel = 'ends with';
  export let equalsLabel = 'equals';
  export let evenBgColor = 'white';
  export let filterAll = false;
  export let filtersLabel = 'Filters Applied';
  export let getUrl;
  export let headings;
  export let headingBgColor = '#f2F2F2';
  export let headingTooltip;
  export let moreBtnText = 'More Results';
  export let noneText = 'none';
  export let notEqualsLabel = 'not equals';
  export let oddBgColor = '#f9f8f9';
  export let pageSize = 15;
  export let pointTypeText = 'Point Type';
  export let redemptionIdText = 'Redemption ID';
  export let sortAll = false;
  export let startDateText = 'Start Date';
  export let startsWithLabel = 'starts with';

  const LEFT_RELATIONAL_OPERATORS = ['', '>', '>=', '=', '!='];
  const RIGHT_RELATIONAL_OPERATORS = ['', '<=', '<'];
  const STRING_OPERATORS = [
    '',
    equalsLabel,
    notEqualsLabel,
    containsLabel,
    startsWithLabel,
    endsWithLabel
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

  function reset() {
    setStartIndex(0);
    setRowCount(pageSize);
  }

  function applyFilters() {
    Object.values(filters).forEach(filter => (filter.applied = true));
    setStartIndex(0);
    setFilterHeading(null);
    loadData(0, filters);
  }

  function clearAllFilters() {
    reset();
    setFilterHeading(null);
    setFilters({});
    loadData(0, {});
  }

  function clearThisFilter(property) {
    reset();
    setFilterHeading(null);
    const newFilters = {...filters};
    delete newFilters[property];
    setFilters(newFilters);
    loadData(0, newFilters);
  }

  function formatValue(heading, obj): unknown {
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

  function getDataRow(data, rowIndex) {
    return (
      <React.Fragment key={'row-' + rowIndex}>
        <tr
          class={getRowClass(rowIndex)}
          style={{backgroundColor: getRowBgColor(rowIndex)}}
        >
          {headings.map((heading, columnIndex) =>
            getTd(heading, columnIndex, data)
          )}
          {DetailComponent && (
            <td class="info">
              <button on:click={e => showDetail(e)}>
                <Icon
                  class="detail-icon"
                  icon="chevron-circle-right"
                  size="1x"
                />
              </button>
            </td>
          )}
        </tr>
        {DetailComponent && (
          <tr class="detail-tr">
            <td class="detail-td">
              <DetailComponent
                data={data}
                descriptionText={descriptionText}
                pointTypeText={pointTypeText}
                redemptionIdText={redemptionIdText}
              />
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }

  function getFilterArea(): ReactElement | null {
    const anyFilters = headings.some(canFilterHeading);
    if (!anyFilters) return null;

    return (
      <div class="filter-area">
        <div class="filter-description">
          <Icon color="var(--secondary-color)" icon="filter" />
          <div class="heading">
            <div class="label">{filtersLabel}</div>
            {getFilterDescription()}
          </div>
        </div>
        <div class="buttons">{headings.map(getFilterButton)}</div>
        {filterHeading && (
          <div class="filter-inputs">
            {getFilterInputs(filterHeading)}
            <button class="apply primary" on:click={applyFilters}>
              {applyLabel}
            </button>
          </div>
        )}
      </div>
    );
  }

  function getFilterButton(heading, index) {
    if (!canFilterHeading(heading)) return null;

    const isSelected = heading === filterHeading;
    const filter = filters[heading.property];
    if (filter) filter.title = heading.title;
    const isSet = filter && filter.applied;
    const classes =
      'filter-btn' + (isSelected ? ' selected' : '') + (isSet ? ' set' : '');
    return (
      <button
        class={classes}
        key={'heading-' + index}
        on:click={() => setFilterHeading(heading)}
      >
        {heading.title}
      </button>
    );
  }

  function getFilterDescription() {
    function getCondition(operator, value) {
      return operator && value !== undefined ? ` ${operator} ${value}` : '';
    }

    const appliedFilters = Object.values(filters).filter(f => f.applied);
    if (appliedFilters.length === 0) return <div>{noneText}</div>;

    return (
      <React.Fragment key="description">
        <span key="left-all">(</span>
        <Button
          asLink
          key="btn-all"
          on:click={clearAllFilters}
          text={clearAllLabel}
        />
        <span key="right-all">):</span>

        {appliedFilters.map((filter, index) => {
          let description = getCondition(filter.operator1, filter.value1);
          description += getCondition(filter.operator2, filter.value2);
          return (
            <>
              {index > 0 && <span>&nbsp;/</span>}
              <span class="title" key={'title' + index}>
                &nbsp;{filter.title}&nbsp;
              </span>
              <span key={'left' + index}>{description}&nbsp;(</span>
              <Button
                asLink
                key={'btn' + index}
                on:click={() => clearThisFilter(filter.property)}
                text={clearThisLabel}
              />
              <span key={'right' + index}>)</span>
            </>
          );
        })}
      </React.Fragment>
    );
  }

  function getFilterInputs(heading) {
    if (!canFilterHeading(heading)) return null;

    const {property, type} = heading;
    let filter = filters[property];
    if (!filter) filter = {property, title: heading.title};

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
        setSelectedButton(showCustomDateRange ? '' : customDateRangeLabel);
        setShowCustomDateRange(!showCustomDateRange);
      }
      return getToggleButton(customDateRangeLabel, onClick);
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
            {selectedButton !== customDateRangeLabel &&
              datePeriodFilters.map(filter =>
                getMonthButton(filter.title, filter.months)
              )}
            {getCustomRangeButton()}
          </div>
          {showCustomDateRange && (
            <>
              <div>
                <label class="date">
                  {startDateText} {getInput('value1', 'date')}
                </label>
              </div>
              <div>
                <label class="date">
                  {endDateText} {getInput('value2', 'date')}
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

  function getFilterValue(filter, key) {
    return filter[key];
  }

  function getRowBgColor(index) {
    return index % 2 === 0 ? evenBgColor : oddBgColor;
  }

  function getRowClass(index) {
    return index % 2 === 0 ? 'even' : 'odd';
  }

  function getTd(heading, columnIndex, obj) {
    return (
      <td class={heading.type} key={'column-' + columnIndex}>
        {/* {obj[heading.property]} */}
        {formatValue(heading, obj)}
      </td>
    );
  }

  function getTh(heading, index) {
    const sortedOn = heading === sortHeading;

    const key =
      (heading.type || 'string') +
      '-' +
      (!sortedOn || ascending ? 'ascending' : 'descending');
    const iconName = sortIconMap[key];

    const canSort =
      heading.canSort || (sortAll && heading.canSort === undefined);

    return (
      <th key={'heading-' + index} style={thStyle}>
        <div class="heading">
          <div class="title">{heading.title}</div>
          {canSort && (
            <button on:click={() => sortData(heading)}>
              <Icon
                color={
                  sortedOn ? 'var(--primary-color)' : 'var(--secondary-color)'
                }
                icon={iconName}
              />
            </button>
          )}
        </div>
      </th>
    );
  }

  function loadMoreResults() {
    setStartIndex(rowCount);
    setRowCount(rowCount => rowCount + pageSize);
    // Keep current sortHeading and ascending values.
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
  {getFilterArea()}
  <table>
    <thead>
      <tr style={{backgroundColor: headingBgColor}}>
        {headings.map(getTh)}
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
    <tbody>{data.map(getDataRow)}</tbody>
  </table>
  <button
    class="more-btn primary"
    disabled={atEnd}
    on:click={loadMoreResults}
  >
    {moreBtnText}
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