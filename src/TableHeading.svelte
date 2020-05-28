<script>
  import * as solid from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher} from 'svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let ascending;
  export let heading;
  export let loadData;
  export let mobile;
  export let sortAll;
  export let sortHeading;
  export let thStyle;

  const SORTED_COLOR = 'var(--osc-primary-color, cornflowerblue)';
  const UNSORTED_COLOR = 'var(--osc-secondary-color, orange)';

  const dispatch = createEventDispatcher();

  const sortIconMap = {
    'currency-ascending': solid.faSortNumericDown,
    'currency-descending': solid.faSortNumericDownAlt,
    'date-ascending': solid.faSortAmountDownAlt,
    'date-descending': solid.faSortAmountDown,
    'number-ascending': solid.faSortNumericDown,
    'number-descending': solid.faSortNumericDownAlt,
    'string-ascending': solid.faSortAlphaDown,
    'string-descending': solid.faSortAlphaDownAlt
  };

  const canSort = heading.canSort || (sortAll && heading.canSort === undefined);

  $: sortedOn = heading === sortHeading;

  $: key =
    (heading.type || 'string') +
    '-' +
    (!sortedOn || ascending ? 'ascending' : 'descending');

  $: icon = sortIconMap[key];

  function sortData(heading) {
    dispatch('reset');
    ascending = !sortHeading
      ? true
      : heading === sortHeading
      ? !ascending
      : true;
    sortHeading = heading;
    loadData();
  }
</script>

{#if !heading.optional || !mobile}
  <th style={thStyle}>
    <div class="heading">
      <div class="title">{heading.title}</div>
      {#if canSort}
        <Button on:click={() => sortData(heading)}>
          <Icon color={sortedOn ? SORTED_COLOR : UNSORTED_COLOR} {icon} />
        </Button>
      {/if}
    </div>
  </th>
{/if}

<style>
  .heading {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }

  .heading :global(.osc-button) {
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }

  .heading :global(.osc-icon) {
    color: var(--osc-secondary-color, orange);
    font-size: 1.4rem;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .title {
    font-weight: normal;
    margin-right: 0.5rem;
  }

  @media (max-width: 760px) {
    .heading > .title {
      font-size: 0.7rem;
    }
  }
</style>
