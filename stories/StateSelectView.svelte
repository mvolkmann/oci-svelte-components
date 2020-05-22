<script>
  import get from 'lodash-es/get';
  import {globalStore, update} from '../src/stores';
  import CountrySelect from '../src/CountrySelect.svelte';
  import StateSelect from '../src/StateSelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Toggle from '../src/Toggle.svelte';

  const statePath = 'stateSelect.state';

  globalStore.set({stateSelect: {countryCode: '', vertical: false}});

  $: stateSelect = get($globalStore, 'stateSelect');
  $: ({countryCode, vertical} = stateSelect);

  const clearState = () => update(globalStore, statePath, '');
</script>

<Toggle label="Vertical" path="stateSelect.vertical" />
<CountrySelect
  label="State"
  on:value={clearState}
  path="stateSelect.countryCode"
  {vertical} />
<StateSelect {countryCode} path={statePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={statePath} />
