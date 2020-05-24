<script>
  import Icon from './Icon.svelte';

  export let data;
  export let detailComponent = false;
  export let detailTr;
  export let evenBgColor;
  export let headings;
  export let oddBgColor;
  export let rowIndex;

  const getRowClass = index => (index % 2 === 0 ? 'even' : 'odd');

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

  const getRowBgColor = index => (index % 2 === 0 ? evenBgColor : oddBgColor);

  function toggleDetail(event) {
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
</script>

<tr
  class={getRowClass(rowIndex)}
  style={`backgroundColor: ${getRowBgColor(rowIndex)}`}>
  {#each headings as heading, columnIndex}
    <td class={heading.type} key={'column-' + columnIndex}>
      {formatValue(heading, data)}
    </td>
  {/each}

  {#if detailComponent}
    <td class="info">
      <button on:click={e => toggleDetail(e)}>
        <Icon class="detail-icon" icon="chevron-circle-right" size="1x" />
      </button>
    </td>
  {/if}
</tr>
{#if detailComponent}
  <tr class="detail-tr">
    <td class="detail-td">
      <svelte:component this={detailComponent} {data} />
    </td>
  </tr>
{/if}

<style>
  .info :global(.detail-icon) {
    color: lightgray;
    font-size: 1rem;
    transition-duration: var(--transition-duration);
    transition-property: transform;
    transform: rotate(0deg);
  }

  .detail-tr {
    display: none;
  }

  .detail-tr > td > * {
    max-height: 0;
    transition-duration: var(--transition-duration);
    transition-property: max-height;
  }

  :global(.show-detail .detail-icon) {
    color: var(--primary-color);
    transform: rotate(90deg);
  }

  :global(.detail-icon) {
    color: var(--secondary-color);
  }

  :global(.show-detail) + .detail-tr {
    display: table-row;
  }

  :global(.show-detail) + .detail-tr > td > * {
    max-height: 100vh;
  }

  td {
    border: none;
    border-left: solid lightgray 1px;
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

  @media (max-width: 760px) {
    td {
      font-size: 0.7rem;
    }
  }
</style>
