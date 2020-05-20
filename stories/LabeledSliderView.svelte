<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  const valuePath = 'labeledSlider.value';
  const verticalPath = 'labeledSlider.vertical';
  const widthPath = 'labeledSlider.width';

  globalStore.set({
    labeledSlider: {
      value: 0,
      vertical: false,
      width: 200
    }
  });

  $: vertical = get($globalStore, verticalPath);
  $: width = get($globalStore, widthPath);
</script>

<LabeledInput info="in pixels" label="Width" path={widthPath} type="number" />
<LabeledToggle label="Vertical?" path={verticalPath} />
<LabeledSlider
  label="Score"
  min={0}
  max={100}
  path={valuePath}
  {vertical}
  width={width + 'px'} />
<LabeledState defaultValue="0" label="The score is" path={valuePath} />
