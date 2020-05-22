<script>
  import Button from '../src/Button.svelte';
  import Dialog from '../src/Dialog.svelte';

  let dialogRef;
</script>

<Button label="Show Dialog" on:click={() => dialogRef.show()} />

<Dialog bind:ref={dialogRef} title="My Dialog">
  <div>My Content</div>
</Dialog>
