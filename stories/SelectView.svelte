<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import Select from '../src/Select.svelte';
  import Toggle from '../src/Toggle.svelte';

  const options = [
    'Apple',
    {label: 'Banana', value: 'yellow'},
    {label: 'Cherry', value: 'red'}
  ];
  const valuePath = 'select.value';
  const verticalPath = 'select.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<Select label="Fruit" {options} path={valuePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={valuePath} />
