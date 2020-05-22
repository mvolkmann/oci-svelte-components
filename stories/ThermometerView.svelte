<script>
  import Input from '../src/Input.svelte';
  import Slider from '../src/Slider.svelte';
  import {globalStore} from '../src/stores';
  import Thermometer from '../src/Thermometer.svelte';

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

<Input
  label="Background Color"
  path="thermometer.backgroundColor"
  type="color" />
<Input label="Color" path="thermometer.color" type="color" />
<Input label="Label Color" path="thermometer.labelColor" type="color" />
<Slider
  label="Width"
  max={500}
  min={100}
  path="thermometer.width"
  showLimits
  showValue />
<Slider
  label="Height"
  max={50}
  min={20}
  path="thermometer.height"
  showLimits
  showValue />
<Slider
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
