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

  globalStore.set({
    dial: {
      gap: 20,
      size: 300,
      strokeWidth: 40,
      value: 0
    }
  });

  $: dial = get($globalStore, 'dial');
  $: ({gap, size, strokeWidth} = dial);
</script>

<Slider
  info="in pixels"
  label="Size"
  max={400}
  min={200}
  path="dial.size"
  {...commonSliderProps} />

<Slider
  info="in pixels"
  label="Stroke Width"
  max={50}
  min={1}
  path="dial.strokeWidth"
  {...commonSliderProps} />

<Slider
  info="in pixels"
  label="Gap"
  max={60}
  min={1}
  path="dial.gap"
  {...commonSliderProps} />

<Slider {label} path="dial.value" {...commonSliderProps} />

<Dial {gap} {label} min={0} max={100} path="dial.value" {size} {strokeWidth} />
