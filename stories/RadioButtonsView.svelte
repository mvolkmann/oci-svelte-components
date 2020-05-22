<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import RadioButtons from '../src/RadioButtons.svelte';
  import Toggle from '../src/Toggle.svelte';

  const options = [
    'Apple',
    {label: 'Banana', value: 'yellow'},
    {label: 'Cherry', value: 'red'}
  ];
  const valuePath = 'labeledRadioButtons.value';
  const verticalPath = 'labeledRadioButtons.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<Toggle label="Vertical" path={verticalPath} />
<RadioButtons label="Fruit" {options} path={valuePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={valuePath} />
