<script>
  import get from 'lodash-es/get';
  import Dialog from './Dialog.svelte';
  import Input from './Input.svelte';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';
  import {formatDate2} from './util';

  export let className = undefined;
  export let endDatePath;
  export let endLabel = 'End';
  export let label = undefined;
  export let startDatePath;
  export let startLabel = 'Start';
  export let store = globalStore;
  export let vertical = false;

  let dialogRef;
  let errorMessage;

  $: classes =
    'osc-date-range' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  $: startDate = get($store, startDatePath);
  $: formattedStartDate = formatDate2(startDate);
  $: endDate = get($store, endDatePath);
  $: formattedEndDate = formatDate2(endDate);

  function dateStringToDate(dateString) {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
  }

  function onStartChange(event) {
    const date = dateStringToDate(event.detail);
    if (!endDate || date <= endDate) {
      update(store, startDatePath, date);
    } else {
      errorMessage = 'The start date must preceded the end date.';
      dialogRef.showModal();
      update(store, startDatePath, new Date(endDate));
    }
  }

  function onEndChange(event) {
    const date = dateStringToDate(event.detail);
    if (!startDate || date >= startDate) {
      update(store, endDatePath, date);
    } else {
      errorMessage = 'The end date must follow the end date.';
      dialogRef.showModal();
      update(store, endDatePath, new Date(startDate));
    }
  }
</script>

<div class={classes}>
  <Labeled {label} {vertical}>
    <div class="content">
      <label class="start-label">{startLabel}</label>
      <Input
        className="start-input"
        on:value={onStartChange}
        type="date"
        value={formattedStartDate} />
      <label class="end-label">{endLabel}</label>
      <Input
        className="end-input"
        on:value={onEndChange}
        type="date"
        value={formattedEndDate} />
    </div>
  </Labeled>
  <Dialog bind:ref={dialogRef} title="Invalid Date">{errorMessage}</Dialog>
</div>

<style>
  .content {
    display: grid;
    align-items: center;
    grid-gap: 0.5rem;
    grid-template-areas: 'start-label start-input end-label end-input';
    grid-template-columns: auto auto auto auto;
  }

  .end-input {
    grid-area: end-input;
  }

  .end-label {
    grid-area: end-label;
  }

  label {
    margin: 0 0 0 1rem;
  }

  .osc-date-range {
    margin-bottom: 1rem;
  }

  .osc-date-range :global(.osc-labeled) {
    margin-bottom: 0;
  }

  .start-input {
    grid-area: start-input;
  }

  .start-label {
    grid-area: start-label;
  }

  .vertical .content {
    grid-template-areas: 'start-label start-input' 'end-label end-input';
    grid-template-columns: auto auto;
  }

  .vertical label {
    margin-left: 0;
    text-align: right;
  }
</style>
