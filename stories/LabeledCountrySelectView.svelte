<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledCountrySelect from '../src/LabeledCountrySelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const path = 'user.profile.address.country';
  const verticalPath = 'labeledCountrySelect.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<LabeledToggle label="Vertical" path={verticalPath} />
<LabeledCountrySelect label="Country" {path} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" {path} />
