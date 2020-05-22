<script>
  import * as solid from '@fortawesome/free-solid-svg-icons';
  import Button from '../src/Button.svelte';
  import Dialog from '../src/Dialog.svelte';

  let dialogRef;
</script>

<Button label="Show Dialog" on:click={() => dialogRef.show()} />

<Dialog bind:ref={dialogRef} icon={solid.faHeart} title="My Dialog">
  <div>My Content</div>
</Dialog>
