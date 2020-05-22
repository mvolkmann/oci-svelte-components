<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Dial from '../src/Dial.svelte';
  import Slider from '../src/Slider.svelte';

  const commonSliderProps = {
    showLimits: true,
    showValue: true,
    vertical: true
  };
  const label = 'Value';
  const gapPath = 'dial.gap';
  const sizePath = 'dial.size';
  const strokeWidthPath = 'dial.strokeWidth';
  const valuePath = 'dial.value';

  globalStore.set({
    dial: {
      gap: 20,
      size: 300,
      strokeWidth: 40,
      value: 0
    }
  });

  $: gap = get($globalStore, gapPath);
  $: size = get($globalStore, sizePath);
  $: strokeWidth = get($globalStore, strokeWidthPath);
</script>

<Slider
  info="in pixels"
  label="Size"
  max={400}
  min={200}
  path={sizePath}
  {...commonSliderProps} />

<Slider
  info="in pixels"
  label="Stroke Width"
  max={50}
  min={1}
  path={strokeWidthPath}
  {...commonSliderProps} />

<Slider
  info="in pixels"
  label="Gap"
  max={60}
  min={1}
  path={gapPath}
  {...commonSliderProps} />

<Slider {label} path={valuePath} {...commonSliderProps} />

<Dial {gap} {label} min={0} max={100} path={valuePath} {size} {strokeWidth} />
