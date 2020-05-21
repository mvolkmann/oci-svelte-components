<script>
  import get from 'lodash-es/get';
  import set from 'lodash-es/set';
  import Labeled from './Labeled.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import {globalStore} from './stores';
  import {formatDate2} from './util';

  export let className = undefined;
  export let endDatePath;
  export let endLabel = 'End';
  export let label = undefined;
  export let startDatePath;
  export let startLabel = 'Start';
  export let store = globalStore;
  export let vertical = false;

  $: classes =
    'osc-date-range' +
    (className ? ' ' + className : '') +
    (vertical ? ' vertical' : '');

  $: endDate = get($store, endDatePath);
  $: startDate = get($store, startDatePath);

  function dateStringToDate(dateString) {
    console.log('DateRange.svelte dateStringToDate: dateString =', dateString);
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-');
    const result = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      0,
      0,
      0
    );
    console.log('DateRange.svelte dateStringToDate: result =', result);
    return result;
  }

  function onStartChange(event) {
    const date = dateStringToDate(event.detail);
    if (date <= endDate) {
      store.update(obj => set(obj, startDatePath, date));
    } else {
      alert('The start date must preceded the end date.');
    }
  }

  function onEndChange(event) {
    const date = dateStringToDate(event.detail);
    if (date >= startDate) {
      store.update(obj => set(obj, endDatePath, date));
    } else {
      alert('The end date must follow the end date.');
    }
  }
</script>

<div class={classes}>
  <Labeled {label} {vertical}>
    <LabeledInput
      className="start"
      label={startLabel}
      on:value={onStartChange}
      type="date"
      value={formatDate2(new Date(startDate))} />
    <LabeledInput
      className="end"
      label={endLabel}
      on:value={onEndChange}
      type="date"
      value={formatDate2(new Date(endDate))} />
  </Labeled>
</div>

<style>
  .osc-date-range {
    display: flex;
    margin-bottom: 1rem;
  }

  .osc-date-range :global(.end) {
    /* TODO: Need this on the label, not the input! */
    margin-left: 1rem;
  }

  .osc-date-range :global(.osc-labeled) {
    margin-bottom: 0;
  }

  .vertical {
    flex-direction: column;
  }

  .vertical :global(.osc-labeled) {
    margin-bottom: 1rem;
  }
</style>
