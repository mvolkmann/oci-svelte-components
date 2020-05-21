<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const readyPath = 'labeledToggle.ready';
  const verticalPath = 'labeledStateSelect.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<LabeledToggle label="Vertical?" path={verticalPath} />
<LabeledToggle label="Ready" path={readyPath} {vertical} />
<LabeledState defaultValue="unset" label="Ready is" path={readyPath} />
