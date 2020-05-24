<script>
  import {createEventDispatcher} from 'svelte';
  import * as solid from '@fortawesome/free-solid-svg-icons';
  import Icon from './Icon.svelte';

  export let ascending;
  export let heading;
  export let index;
  export let sortAll;
  export let sortHeading;
  export let thStyle;

  const dispatch = createEventDispatcher();

  const sortedOn = heading === sortHeading;

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

  const key =
    (heading.type || 'string') +
    '-' +
    (!sortedOn || ascending ? 'ascending' : 'descending');

  const iconName = sortIconMap[key];

  const canSort = heading.canSort || (sortAll && heading.canSort === undefined);

  function sortData(heading) {
    dispatch('reset');
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

<style>
  th > .heading {
    display: flex;
    align-items: center;
  }

  th > .heading button {
    background-color: transparent;
    border: none;
    padding-left: 0;
  }

  th > .heading :global(.icon) {
    font-size: 0.7rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 760px) {
    .heading > .title {
      font-size: 0.7rem;
    }
  }
</style>
