<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import Slider from '../src/Slider.svelte';
  import Toggle from '../src/Toggle.svelte';

  const valuePath = 'slider.value';

  globalStore.set({
    slider: {
      showLimits: false,
      showValue: false,
      value: 0,
      vertical: false,
      width: 200
    }
  });

  $: slider = get($globalStore, 'slider');
  $: ({showLimits, showValue, vertical, width} = slider);
</script>

<Slider
  info="in pixels"
  label="Width"
  max={400}
  min={100}
  path="slider.width"
  showLimits
  showValue />
<Toggle label="Show Value" path="slider.showValue" />
<Toggle label="Show Limits" path="slider.showLimits" />
<Toggle label="Vertical" path="slider.vertical" />
<Slider
  label="Score"
  min={0}
  max={100}
  path={valuePath}
  {showLimits}
  {showValue}
  {vertical}
  width={width + 'px'} />
<LabeledState defaultValue="0" label="The score is" path={valuePath} />
