<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledState from '../src/LabeledState.svelte';
  import Slider from '../src/Slider.svelte';
  import Toggle from '../src/Toggle.svelte';

  const showLimitsPath = 'slider.showLimits';
  const showValuePath = 'slider.showValue';
  const valuePath = 'slider.value';
  const verticalPath = 'slider.vertical';
  const widthPath = 'slider.width';

  globalStore.set({
    slider: {
      showLimits: false,
      showValue: false,
      value: 0,
      vertical: false,
      width: 200
    }
  });

  $: showLimits = get($globalStore, showLimitsPath);
  $: showValue = get($globalStore, showValuePath);
  $: vertical = get($globalStore, verticalPath);
  $: width = get($globalStore, widthPath);
</script>

<Slider
  info="in pixels"
  label="Width"
  max={400}
  min={100}
  path={widthPath}
  showLimits
  showValue />
<Toggle label="Show Value" path={showValuePath} />
<Toggle label="Show Limits" path={showLimitsPath} />
<Toggle label="Vertical" path={verticalPath} />
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
