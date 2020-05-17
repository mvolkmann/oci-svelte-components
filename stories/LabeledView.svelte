<script>
  import Labeled from '../src/Labeled.svelte';
  export let label;
  export let vertical = false;
</script>

<Labeled {label} {vertical}>
  <div>My Content</div>
</Labeled>
