<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import CountrySelect from '../src/CountrySelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Toggle from '../src/Toggle.svelte';

  const path = 'user.profile.address.country';
  const verticalPath = 'labeledCountrySelect.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<CountrySelect label="Country" {path} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" {path} />
