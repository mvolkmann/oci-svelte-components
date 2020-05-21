<script>
  import LabeledState from '../src/LabeledState.svelte';
  import ToggleButtons from '../src/ToggleButtons.svelte';

  const options = ['red', 'green', 'blue'];
  const path = 'toggleButtons.value';
</script>

<ToggleButtons {options} {path} />
<LabeledState label="You selected" {path} />
