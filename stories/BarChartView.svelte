<script>
  import {action} from '@storybook/addon-actions';
  import BarChart from '../src/BarChart.svelte';
  import Button from '../src/Button.svelte';
  import Slider from '../src/Slider.svelte';
  import Toggle from '../src/Toggle.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    players: [
      {name: 'Mark', score: 20},
      {name: 'Tami', score: 40},
      {name: 'Amanda', score: 50},
      {name: 'Jeremy', score: 68}
    ],
    horizontalChart: true
  });

  const height = 250; //200;
  const width = 400;

  const labelAccessor = player => player.name;
  const valueAccessor = player => player.score;

  function addPlayer() {
    const {players} = $globalStore;
    players.push({name: 'Player' + (players.length + 1), score: 50});
    $globalStore.players = players;
  }

  function removeFirstPlayer() {
    const {players} = $globalStore;
    players.shift();
    $globalStore.players = players;
  }
</script>

<Toggle label="Horizontal?" path="horizontalChart" />

{#each $globalStore.players as player, index}
  <Slider
    label={`${player.name}'s score`}
    max={100}
    min={0}
    path={`players.${index}.score`}
    showLimits
    showValue />
{/each}

<Button on:click={() => addPlayer()}>Add Player</Button>
<Button on:click={removeFirstPlayer}>Remove First Player</Button>

<BarChart
  data={$globalStore.players}
  {height}
  horizontal={$globalStore.horizontalChart}
  id="players-bar-chart"
  maxValue={100}
  {width}
  {labelAccessor}
  {valueAccessor} />
