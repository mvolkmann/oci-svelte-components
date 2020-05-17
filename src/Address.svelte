<script>
  //import {get} from 'lodash';
  import get from 'lodash/get';
  import LabeledCountrySelect from './LabeledCountrySelect.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledStateSelect from './LabeledStateSelect.svelte';
  import {globalStore, setState} from './stores';
  console.log('Address.svelte x: globalStore =', globalStore);

  export let statePath;
  export let vertical = false;

  let countryCode = '';

  $: countryCode = get ? get($globalStore, statePath + '.country') : '';

  $: zipLabel =
    countryCode === 'USA' ? 'Zip' : countryCode === 'CAN' ? 'Postal Code' : '';

  const clearState = () => setState(statePath + '.state', '');
</script>

<div class="address">
  <LabeledCountrySelect
    on:change={clearState}
    statePath={statePath + '.country'}
    {vertical} />
  {#if countryCode}
    <LabeledInput label="Street" statePath={statePath + '.street'} {vertical} />
    <LabeledInput label="City" statePath={statePath + '.city'} {vertical} />
    <LabeledStateSelect
      {countryCode}
      statePath={statePath + '.state'}
      {vertical} />
    {#if zipLabel}
      <LabeledInput
        label={zipLabel}
        statePath={statePath + '.zip'}
        {vertical} />
    {/if}
  {/if}
</div>
