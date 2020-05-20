<script>
  import Dial from '../src/Dial.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';

  const label = 'Score';
</script>

<LabeledSlider {label} path="game.score" />
<Dial {label} min={0} max={100} path="game.score" />
