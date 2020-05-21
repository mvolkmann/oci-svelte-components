<script>
  import Thermometer from '../src/Thermometer.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    thermometer: {
      backgroundColor: '#ffa500', // orange
      color: '#6495ed', // cornflowerblue
      labelColor: '#ffa500', // orange
      value: 100,
      width: 300
    }
  });

  $: ({backgroundColor, color, labelColor, width} = $globalStore.thermometer);
</script>

<LabeledInput
  label="Background Color"
  path="thermometer.backgroundColor"
  type="color" />
<LabeledInput label="Color" path="thermometer.color" type="color" />
<LabeledInput label="Label Color" path="thermometer.labelColor" type="color" />
<LabeledSlider
  label="Width"
  max={500}
  min={100}
  path="thermometer.width"
  showLimits
  showValue />
<LabeledSlider
  label="Value"
  max={100}
  min={0}
  path="thermometer.value"
  showLimits
  showValue />
<Thermometer
  {backgroundColor}
  {color}
  {labelColor}
  path="thermometer.value"
  {width} />
