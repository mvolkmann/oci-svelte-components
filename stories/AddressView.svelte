<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Address from '../src/Address.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const addressPath = 'user.profile.address';
  const verticalPath = 'labeledCountrySelect.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<LabeledToggle label="Vertical?" path={verticalPath} />
<Address path={addressPath} {vertical} />
