<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledSelect from '../src/LabeledSelect.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const options = [
    'Apple',
    {label: 'Banana', value: 'yellow'},
    {label: 'Cherry', value: 'red'}
  ];
  const valuePath = 'labeledRadioButtons.value';
  const verticalPath = 'labeledRadioButtons.vertical';

  $: vertical = get($globalStore, verticalPath);
</script>

<LabeledToggle label="Vertical?" path={verticalPath} />
<LabeledSelect label="Fruit" {options} path={valuePath} {vertical} />
<LabeledState defaultValue="nothing" label="You selected" path={valuePath} />
