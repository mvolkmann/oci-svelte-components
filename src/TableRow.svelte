<script>
  import Icon from './Icon.svelte';

  export let data;
  export let detailComponent = false;
  export let headings;

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
</script>

<tr
  class={getRowClass(rowIndex)}
  style={{backgroundColor: getRowBgColor(rowIndex)}}>
  {#each headings as heading, columnIndex}
    <td class={heading.type} key={'column-' + columnIndex}>
      <!-- {obj[heading.property]} -->
      {formatValue(heading, obj)}
    </td>
  {/each}

  {#if detailComponent}
    <td class="info">
      <button on:click={e => showDetail(e)}>
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
