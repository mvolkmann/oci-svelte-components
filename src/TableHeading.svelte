<script>
  import * as solid from '@fortawesome/free-solid-svg-icons';
  import {createEventDispatcher} from 'svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let ascending;
  export let heading;
  export let loadData;
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

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading :global(.osc-button) {
    background-color: transparent;
    border: none;
    margin-left: 0.5rem;
    margin-right: 2px;
    padding-left: 0;
  }

  .heading :global(.osc-icon) {
    color: var(--osc-secondary-color, orange);
    font-size: 1.4rem;
  }

  @media (max-width: 760px) {
    .heading > .title {
      font-size: 0.7rem;
    }
  }
</style>
