<script>
  import Spinner, {taskEnd, taskStart} from '../src/Spinner.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({ui: {busy: false}});
</script>

<button on:click={taskStart}>Start Task</button>
<button on:click={taskEnd}>End Task</button>

<Spinner />
