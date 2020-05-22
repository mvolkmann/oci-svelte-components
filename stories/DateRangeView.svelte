<script>
  import DateRange from '../src/DateRange.svelte';
  import Input from '../src/Input.svelte';
  import State from '../src/State.svelte';
  import {globalStore} from '../src/stores';
  import Toggle from '../src/Toggle.svelte';

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
</script>

<Input label="Label" path="dateRange.label" />
<Input label="Start Label" path="dateRange.startLabel" />
<Input label="End Label" path="dateRange.endLabel" />
<Toggle label="Vertical" path="dateRange.vertical" />
<DateRange
  {endDatePath}
  {endLabel}
  {label}
  {startDatePath}
  {startLabel}
  {vertical} />
<State label="The start date is" path={startDatePath} />
<State label="The end date is" path={endDatePath} />
