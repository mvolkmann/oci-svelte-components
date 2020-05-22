<script>
  import get from 'lodash-es/get';
  import {globalStore, update} from '../src/stores';
  import CountrySelect from '../src/CountrySelect.svelte';
  import StateSelect from '../src/StateSelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Toggle from '../src/Toggle.svelte';

  const countryPath = 'user.profile.address.country';
  const statePath = 'user.profile.address.state';
  const verticalPath = 'labeledStateSelect.vertical';

  $: countryCode = get($globalStore, countryPath);
  $: vertical = get($globalStore, verticalPath);

  const clearState = () => update(globalStore, statePath, '');
</script>

<Toggle label="Vertical" path={verticalPath} />
<CountrySelect
  label="State"
  on:value={clearState}
  path={countryPath}
  {vertical} />
<StateSelect {countryCode} path={statePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={statePath} />
