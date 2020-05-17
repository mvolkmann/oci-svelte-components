<script>
  import Labeled from '../src/Labeled.svelte';
  export let label;
  export let onRight;
  export let vertical = false;
</script>

<Labeled {label} {onRight} {vertical}>
  <div>My Content</div>
</Labeled>
