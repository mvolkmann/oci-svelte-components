<script context="module">
  let answerCb;

  export function alert({dialogRef, text}) {
    confirm({dialogRef, text, title: 'Alert', type: 'alert'});
  }

  // title is optional; do not pass type when calling directly
  export function confirm({
    dialogRef,
    onAnswer,
    text,
    title = 'Question',
    type = 'confirm'
  }) {
    if (!dialogRef) return;

    answerCb = onAnswer;

    const {classList} = dialogRef;
    if (type === 'error') {
      classList.add('error-dialog');
    } else {
      classList.remove('error-dialog');
    }

    const titleElement = dialogRef.querySelector('.title');
    if (titleElement) titleElement.textContent = title;

    const textDiv = dialogRef.querySelector('.text');
    if (textDiv) {
      // Delete everything currently in the text div.
      while (textDiv.firstChild) {
        textDiv.removeChild(textDiv.lastChild);
      }

      // Add the lines in text to the text div.
      const lines = text.split('\n');
      for (const line of lines) {
        const div = document.createElement('div');
        div.className = 'text';
        div.textContent = line;
        textDiv.appendChild(div);
      }
    }

    const buttons = dialogRef.querySelector('.buttons');
    buttons.style.display = type === 'confirm' ? 'flex' : 'none';

    if (!dialogRef.open) dialogRef.showModal();
  }

  // title is optional
  export function error({dialogRef, text, title = 'Error'}) {
    confirm({
      dialogRef,
      isConfirm: false,
      title,
      text,
      type: 'error'
    });
  }

  function respond(dialogRef, answer) {
    if (answerCb) answerCb(answer);
    dialogRef.close();
  }
</script>

<script>
  // Render this in top-most component, typically in App.svelte.

  import Button from './Button.svelte';
  import Dialog from './Dialog.svelte';

  export let dialogRef;
  export let onClose = undefined;
</script>

<div class="message-dialog">
  <Dialog bind:ref={dialogRef} {onClose} title="Confirm">
    <div>
      <div class="text" />
      <div class="buttons">
        <Button className="small" on:click={() => respond(dialogRef, true)}>
          {'Yes'}
        </Button>
        <Button className="small" on:click={() => respond(dialogRef, false)}>
          {'No'}
        </Button>
      </div>
    </div>
  </Dialog>
</div>

<style>
  .message-dialog :global(.buttons) {
    display: flex;
    justify-content: center;
  }

  .message-dialog :global(.osc-button) {
    margin: 1rem 0.5rem 0 0.5rem;
  }
</style>
