<script>
  import Icon from './Icon.svelte';

  export let ascending;
  export let heading;
  export let index;
  export let sortAll;
  export let sortHeading;
  export let sortIconMap;
  export let thStyle;

  const sortedOn = heading === sortHeading;

  const key =
    (heading.type || 'string') +
    '-' +
    (!sortedOn || ascending ? 'ascending' : 'descending');

  const iconName = sortIconMap[key];

  const canSort = heading.canSort || (sortAll && heading.canSort === undefined);

  function sortData(heading) {
    startIndex = 0;
    rowCount = pageSize; // reset to initial size
    sortHeading = heading;
    ascending = !sortHeading
      ? true
      : heading === sortHeading
      ? !ascending
      : true;
  }
</script>

<th key={'heading-' + index} style={thStyle}>
  <div class="heading">
    <div class="title">{heading.title}</div>
    {#if canSort}
      <button on:click={() => sortData(heading)}>
        <Icon
          color={sortedOn ? 'var(--primary-color)' : 'var(--secondary-color)'}
          icon={iconName} />
      </button>
    {/if}
  </div>
</th>
