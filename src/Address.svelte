<script>
  import get from 'lodash-es/get';
  import CountrySelect from './CountrySelect.svelte';
  import Input from './Input.svelte';
  import StateSelect from './StateSelect.svelte';
  import {globalStore, update} from './stores';
  console.log('Address.svelte x: globalStore =', globalStore);

  export let path; // required for now
  export let store = globalStore;
  export let vertical = false;

  let countryCode = '';

  $: countryCode = get($store, path + '.country');

  $: zipLabel =
    countryCode === 'USA' ? 'Zip' : countryCode === 'CAN' ? 'Postal Code' : '';

  const clearState = () => update(store, path + '.state', '');
</script>

<div class="address">
  <CountrySelect on:value={clearState} path={path + '.country'} {vertical} />
  {#if countryCode}
    <Input label="Street" path={path + '.street'} {vertical} />
    <Input label="City" path={path + '.city'} {vertical} />
    <StateSelect {countryCode} path={path + '.state'} {vertical} />
    {#if zipLabel}
      <Input label={zipLabel} path={path + '.zip'} {vertical} />
    {/if}
  {/if}
</div>
