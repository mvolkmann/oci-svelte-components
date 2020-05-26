<script>
  import {createEventDispatcher, getContext} from 'svelte';
  import Button from './Button.svelte';

  export let loadData;

  const dispatch = createEventDispatcher();

  const filtersStore = getContext('filtersStore');

  $: appliedFilters = Object.values($filtersStore).filter(f => f.applied);

  function clearAllFilters() {
    dispatch('reset');
    $filtersStore.map(clearFilter);
    loadData();
  }

  function clearFilter(filter) {
    const {index, property, title, type} = filter;

    // Create a new filter object that omits filtering data.
    $filtersStore[index] = {applied: false, index, property, title, type};

    dispatch('reset');
    loadData();
  }

  function getCondition(operator, value) {
    return operator && value !== undefined ? ` ${operator} ${value}` : '';
  }

  function getDescription(filter) {
    const desc1 = getCondition(filter.operator1, filter.value1);
    const desc2 = getCondition(filter.operator2, filter.value2);
    return desc2 ? desc1 + ' and ' + desc2 : desc1;
  }
</script>

{#if appliedFilters.length === 0}
  <div>none</div>
{:else}
  <Button asLink on:click={clearAllFilters}>clear all</Button>

  {#each appliedFilters as filter, index}
    <span>&nbsp;/</span>
    <span class="title">&nbsp;{filter.title}&nbsp;</span>
    <span>{getDescription(filter)}&nbsp;</span>
    <Button asLink on:click={() => clearFilter(filter)}>clear</Button>
  {/each}
{/if}
