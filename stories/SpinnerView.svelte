<script>
  import Button from '../src/Button.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Spinner, {taskEnd, taskStart} from '../src/Spinner.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({ui: {busyCounter: 0, isBusy: false}});
</script>

<Button on:click={taskStart}>Start Task</Button>
<Button on:click={taskEnd}>End Task</Button>
<LabeledState label="Busy Count" path="ui.busyCounter" />
<Spinner />
