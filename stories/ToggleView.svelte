<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import Toggle from '../src/Toggle.svelte';

  const readyPath = 'toggle.ready';
  const verticalPath = 'toggle.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<Toggle label="Ready" path={readyPath} {vertical} />
<LabeledState defaultValue="unset" label="Ready is" path={readyPath} />
