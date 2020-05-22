<script>
  import LabeledState from '../src/LabeledState.svelte';
  import Spinner, {taskEnd, taskStart} from '../src/Spinner.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({ui: {busyCounter: 0, isBusy: false}});
</script>

<button on:click={taskStart}>Start Task</button>
<button on:click={taskEnd}>End Task</button>
<LabeledState label="Busy Count" path="ui.busyCounter" />
<Spinner />
