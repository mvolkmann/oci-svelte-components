<script>
  import {createEventDispatcher, getContext} from 'svelte';
  import Button from './Button.svelte';

  export let loadData;

  const dispatch = createEventDispatcher();

  const filtersStore = getContext('filtersStore');

  const appliedFilters = Object.values($filtersStore).filter(f => f.applied);

  function clearAllFilters() {
    dispatch('reset');
    $filtersStore = {};
    loadData(0, {});
  }

  function clearThisFilter(property) {
    dispatch('reset');
    const newFilters = {...$filtersStore};
    delete newFilters[property];
    $filtersStore = newFilters;
    loadData(0, newFilters);
  }

  function getCondition(operator, value) {
    return operator && value !== undefined ? ` ${operator} ${value}` : '';
  }

  function getDescription(filter) {
    let description = getCondition(filter.operator1, filter.value1);
    description += getCondition(filter.operator2, filter.value2);
    return description;
  }
</script>

{#if appliedFilters.length === 0}
  <div>none</div>
{:else}
  <span>(</span>
  <Button asLink label="clear all" on:click={clearAllFilters} />
  <span>):</span>

  {#each appliedFilters as filter, index}
    {#if index > 0}
      <span>&nbsp;/</span>
    {/if}
    <span class="title">&nbsp;{filter.title}&nbsp;</span>
    <span>{getDescription(filter)}&nbsp;(</span>
    <Button
      asLink
      label="clear"
      on:click={() => clearThisFilter(filter.property)} />
    <span>)</span>
  {/each}
{/if}
