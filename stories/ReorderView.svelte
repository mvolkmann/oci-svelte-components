<script>
  import get from 'lodash-es/get';
  import Reorder from '../src/Reorder.svelte';
  import {globalStore} from '../src/stores';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({
    user: {
      colorPreferences: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    }
  });

  $: console.log(
    'ReorderView.svelte: colorPrefererences =',
    $globalStore.user.colorPreferences
  );

  const verticalPath = 'select.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<Reorder label="Color Preferences" path="user.colorPreferences" {vertical} />
