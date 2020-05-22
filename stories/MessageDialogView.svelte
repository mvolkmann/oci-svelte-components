<script>
  import get from 'lodash-es/get';
  import MessageDialog, {
    alert,
    confirm,
    error
  } from '../src/MessageDialog.svelte';
  import Select from '../src/Select.svelte';
  import {globalStore, update} from '../src/stores';

  const typeOptions = ['alert', 'confirm', 'error'];
  const typePath = 'messageDialog.type';

  let answer;
  let dialogRef;

  globalStore.set({messageDialog: {type: ''}});

  $: type = get($globalStore, typePath);

  $: switch (type) {
    case 'alert':
      alert({dialogRef, text: 'Check this out!'});
      break;
    case 'confirm':
      confirm({
        dialogRef,
        onAnswer,
        text: 'Are you feeling\nvery happy today?',
        title: 'Question of the Day'
      });
      break;
    case 'error':
      error({
        dialogRef,
        text: 'Something is broken.',
        title: 'Red Alert!'
      });
      break;
  }

  const onAnswer = value => (answer = value);
  const onClose = () => update(globalStore, typePath, '');
</script>

<Select label="Type" options={typeOptions} path={typePath} />

<MessageDialog bind:dialogRef {onClose} />

{#if answer !== undefined}
  <div>answer is {answer}</div>
{/if}
