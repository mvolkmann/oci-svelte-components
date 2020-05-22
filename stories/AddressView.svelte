<script>
  import {globalStore} from '../src/stores';
  import Address from '../src/Address.svelte';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({addressSelect: {vertical: false}});
</script>

<Toggle label="Vertical" path="addressSelect.vertical" />
<Address
  path="addressSelect.address"
  vertical={$globalStore.addressSelect.vertical} />
