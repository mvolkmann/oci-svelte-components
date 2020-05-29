<script>
  import get from 'lodash-es/get';
  import Reorder from '../src/Reorder.svelte';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({
    user: {
      colorPreferences: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    }
  });

  const verticalPath = 'select.vertical';

  $: vertical = get($globalStore, verticalPath);

  const label = 'Color Preferences';
  const path = 'user.colorPreferences';
</script>

<Toggle label="Vertical" path={verticalPath} />
<Reorder {label} {path} {vertical} />
<LabeledState {label} {path} />
