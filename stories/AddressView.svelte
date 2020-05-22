<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Address from '../src/Address.svelte';
  import Toggle from '../src/Toggle.svelte';

  const addressPath = 'user.profile.address';
  const verticalPath = 'labeledCountrySelect.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<Address path={addressPath} {vertical} />
