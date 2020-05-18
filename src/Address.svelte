<script>
  import get from 'lodash-es/get';
  import LabeledCountrySelect from './LabeledCountrySelect.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledStateSelect from './LabeledStateSelect.svelte';
  import {globalStore, update} from './stores';
  console.log('Address.svelte x: globalStore =', globalStore);

  export let path; // required for now
  export let store = undefined;
  export let vertical = false;

  let countryCode = '';

  if (!store) store = globalStore;
  $: countryCode = get($store, path + '.country');

  $: zipLabel =
    countryCode === 'USA' ? 'Zip' : countryCode === 'CAN' ? 'Postal Code' : '';

  const clearState = () => update(store, path + '.state', '');
</script>

<div class="address">
  <LabeledCountrySelect
    on:value={clearState}
    path={path + '.country'}
    {vertical} />
  {#if countryCode}
    <LabeledInput label="Street" path={path + '.street'} {vertical} />
    <LabeledInput label="City" path={path + '.city'} {vertical} />
    <LabeledStateSelect {countryCode} path={path + '.state'} {vertical} />
    {#if zipLabel}
      <LabeledInput label={zipLabel} path={path + '.zip'} {vertical} />
    {/if}
  {/if}
</div>
