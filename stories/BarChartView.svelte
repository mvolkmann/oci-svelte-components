<script>
  import {action} from '@storybook/addon-actions';
  import BarChart from '../src/BarChart.svelte';

  const height = 160;
  const width = 400;
  const players = [
    {name: 'Mark', score: 20},
    {name: 'Tami', score: 40},
    {name: 'Amanda', score: 50},
    {name: 'Jeremy', score: 68}
  ];

  const labelAccessor = player => player.name;
  const valueAccessor = player => player.score;
</script>

<BarChart
  data={players}
  {height}
  id="players-bar-chart"
  {width}
  {labelAccessor}
  {valueAccessor} />
