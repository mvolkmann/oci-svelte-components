<script>
  import get from 'lodash-es/get';
  import set from 'lodash-es/set';
  import Input from './Input.svelte';
  import Labeled from './Labeled.svelte';
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
      //TODO: Do something better.
      alert('The start date must preceded the end date.');
    }
  }

  function onEndChange(event) {
    const date = dateStringToDate(event.detail);
    if (date >= startDate) {
      store.update(obj => set(obj, endDatePath, date));
    } else {
      //TODO: Do something better.
      alert('The end date must follow the end date.');
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
        value={formatDate2(new Date(startDate))} />
      <label class="end-label">{endLabel}</label>
      <Input
        className="end-input"
        on:value={onEndChange}
        type="date"
        value={formatDate2(new Date(endDate))} />
    </div>
  </Labeled>
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
