<script>
  import get from 'lodash-es/get';
  import {globalStore, update} from '../src/stores';
  import LabeledCountrySelect from '../src/LabeledCountrySelect.svelte';
  import LabeledStateSelect from '../src/LabeledStateSelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const countryPath = 'user.profile.address.country';
  const statePath = 'user.profile.address.state';
  const verticalPath = 'labeledStateSelect.vertical';

  $: countryCode = get($globalStore, countryPath);
  $: vertical = get($globalStore, verticalPath);

  const clearState = () => update(globalStore, statePath, '');
</script>

<LabeledToggle label="Vertical" path={verticalPath} />
<LabeledCountrySelect
  label="State"
  on:value={clearState}
  path={countryPath}
  {vertical} />
<LabeledStateSelect {countryCode} path={statePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={statePath} />
