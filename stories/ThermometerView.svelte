<script>
  import Thermometer from '../src/Thermometer.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';
  import {globalStore} from '../src/stores';

  globalStore.set({
    thermometer: {
      backgroundColor: '#ffa500', // orange
      color: '#6495ed', // cornflowerblue
      height: 50,
      labelColor: '#ffa500', // orange
      value: 20,
      width: 300
    }
  });

  $: ({
    backgroundColor,
    color,
    height,
    labelColor,
    width
  } = $globalStore.thermometer);
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
  label="Height"
  max={50}
  min={20}
  path="thermometer.height"
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
  {height}
  {labelColor}
  path="thermometer.value"
  {width} />
