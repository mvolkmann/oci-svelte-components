<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Dial from '../src/Dial.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
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

<LabeledInput
  info="in pixels"
  label="Size"
  max={400}
  min={0}
  path={sizePath}
  type="number"
  width="50px" />

<LabeledInput
  info="in pixels"
  label="Stroke Width"
  max={50}
  min={1}
  path={strokeWidthPath}
  type="number"
  width="50px" />

<LabeledInput
  info="in pixels"
  label="Gap"
  max={30}
  min={1}
  path={gapPath}
  type="number"
  width="50px" />

<LabeledSlider {label} path="game.score" />

<Dial {gap} {label} min={0} max={100} path="game.score" {size} {strokeWidth} />
