<script>
  import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let bgColor;
  export let data;
  export let detailComponent = undefined;
  export let detailTr;
  export let headings;
  export let mobile;

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

  function toggleDetail(event) {
    // If a detail row is currently displayed, hide it.
    if (detailTr) {
      const tr = detailTr.previousElementSibling;
      if (tr) tr.classList.remove('show-detail');
    }

    // Find the row whose detail button was clicked.
    const button = event.currentTarget;
    const td = button.parentElement;
    if (!td) return;
    const tr = td.parentElement;
    if (!tr) return;

    // Find the detail row that immediately follows this row.
    const newDetailTr = tr.nextElementSibling;
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
    tr.classList.add('show-detail');
  }
</script>

<tr style={`background-color: ${bgColor}`}>
  {#each headings as heading, columnIndex}
    {#if !heading.optional || !mobile}
      <td class={heading.type}>{formatValue(heading, data)}</td>
    {/if}
  {/each}

  {#if detailComponent && mobile}
    <td class="info">
      <Button on:click={e => toggleDetail(e)}>
        <Icon className="detail-icon" icon={faChevronCircleRight} size="1x" />
      </Button>
    </td>
  {/if}
</tr>
{#if detailComponent}
  <tr class="detail-tr">
    <td colspan="100%" class="detail-td">
      <svelte:component this={detailComponent} {data} />
    </td>
  </tr>
{/if}

<style>
  .detail-tr > td {
    padding: 0;
  }

  .detail-tr > td > :global(*) {
    box-sizing: border-box;
    max-height: 0;
    overflow: hidden;
    padding-bottom: 0;
    padding-top: 0;
    transition-duration: var(--osc-transition-duration, 0.5s);
    transition-property: padding-bottom, padding-top, max-height;
  }

  .info :global(.osc-button) {
    background-color: transparent;
    border: none;
    margin-right: 0;
    outline: none;
  }

  .info :global(.osc-button svg) {
    color: var(--osc-secondary-color, orange);
    transition-duration: var(--osc-transition-duration, 0.5s);
    transition-property: transform;
    transform: rotate(0deg);
  }

  :global(.show-detail .detail-icon) {
    transform: rotate(90deg) !important;
  }

  :global(.show-detail) + .detail-tr {
    display: table-row;
  }

  :global(.show-detail) + .detail-tr > td > :global(*) {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    max-height: 100vh;
  }

  td {
    border: none;
    border-left: solid lightgray 1px;
    padding: 0.5rem;
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

  @media (max-width: 760px) {
    td {
      font-size: 0.7rem;
    }
  }
</style>
