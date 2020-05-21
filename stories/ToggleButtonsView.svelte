<script>
  import LabeledState from '../src/LabeledState.svelte';
  import ToggleButtons from '../src/ToggleButtons.svelte';

  const options = ['Red', 'Green', 'Blue'];
  const path = 'toggleButtons.value';
</script>

<ToggleButtons {options} {path} />
<LabeledState defaultValue="nothing" label="You selected" {path} />
