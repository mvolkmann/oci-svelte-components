<script>
  import {action} from '@storybook/addon-actions';
  import BarChart from '../src/BarChart.svelte';
  import Slider from '../src/Slider.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    players: [
      {name: 'Mark', score: 20},
      {name: 'Tami', score: 40},
      {name: 'Amanda', score: 50},
      {name: 'Jeremy', score: 68}
    ]
  });

  const height = 160;
  const width = 400;

  const labelAccessor = player => player.name;
  const valueAccessor = player => player.score;
</script>

{#each $globalStore.players as player, index}
  <Slider
    label={`${player.name}'s score`}
    max={100}
    min={0}
    path={`players.${index}.score`}
    showLimits
    showValue />
{/each}

<BarChart
  data={$globalStore.players}
  {height}
  id="players-bar-chart"
  maxValue={100}
  {width}
  {labelAccessor}
  {valueAccessor} />
