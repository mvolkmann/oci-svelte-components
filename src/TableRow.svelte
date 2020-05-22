<script>
  import Icon from './Icon.svelte';

  export let data;
  export let detailComponent = false;
  export let headings;
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
