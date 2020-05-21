<script>
  import DateRange from '../src/DateRange.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';
  import {globalStore} from '../src/stores';

  const startDatePath = 'dateRange.startPath';
  const endDatePath = 'dateRange.endPath';

  globalStore.set({
    dateRange: {
      endLabel: 'End',
      label: 'My Date Range',
      startLabel: 'Start',
      vertical: false
    }
  });

  $: ({endLabel, label, startLabel, vertical} = $globalStore.dateRange);
  $: console.log('DateRangeView.svelte x: startLabel =', startLabel);
</script>

<LabeledInput label="Label" path="dateRange.label" />
<LabeledInput label="Start Label" path="dateRange.startLabel" />
<LabeledInput label="End Label" path="dateRange.endLabel" />
<LabeledToggle label="Vertical" path="dateRange.vertical" />
<DateRange
  {endDatePath}
  {endLabel}
  {label}
  {startDatePath}
  {startLabel}
  {vertical} />
<LabeledState label="The start date is" path={startDatePath} />
<LabeledState label="The end date is" path={endDatePath} />
