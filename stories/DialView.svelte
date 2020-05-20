<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Dial from '../src/Dial.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';

  const label = 'Score';
  const gapPath = 'dial.gap';
  const sizePath = 'dial.size';
  const strokeWidthPath = 'dial.strokeWidth';

  globalStore.set({dial: {gap: 20, size: 300, strokeWidth: 40}});

  $: gap = get($globalStore, gapPath);
  $: size = get($globalStore, sizePath);
  $: strokeWidth = get($globalStore, strokeWidthPath);
</script>

<LabeledSlider
  info="in pixels"
  label="Size"
  max={400}
  min={200}
  path={sizePath} />

<LabeledSlider
  info="in pixels"
  label="Stroke Width"
  max={50}
  min={1}
  path={strokeWidthPath} />

<LabeledSlider info="in pixels" label="Gap" max={30} min={1} path={gapPath} />

<LabeledSlider {label} path="game.score" />

<Dial {gap} {label} min={0} max={100} path="game.score" {size} {strokeWidth} />
