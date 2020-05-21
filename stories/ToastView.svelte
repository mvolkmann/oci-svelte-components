<script>
  import {globalStore} from '../src/stores';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledSelect from '../src/LabeledSelect.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';
  import Toast from '../src/Toast.svelte';

  globalStore.set({
    toast: {
      backgroundColor: '#ffa500',
      color: '#ffffff',
      message: 'This is a\\ntoast message.',
      side: 'top'
    }
  });

  const backgroundColorPath = 'toast.backgroundColor';
  const colorPath = 'toast.color';
  const messagePath = 'toast.message';
  const showPath = 'toast.show';
  const sidePath = 'toast.side';

  const sideOptions = ['top', 'bottom', 'left', 'right'];
  const horizontalPositionOptions = ['left', 'center', 'right'];
  const verticalPositionOptions = ['top', 'center', 'bottom'];

  $: toast = $globalStore.toast;
  $: ({backgroundColor, color, message, side} = toast);

  let position;
  let positionOptions = [];

  $: if (side) {
    positionOptions =
      side === 'top' || side === 'bottom'
        ? horizontalPositionOptions
        : verticalPositionOptions;
    position = positionOptions[0];
  }
</script>

<LabeledInput
  label="Background Color"
  path={backgroundColorPath}
  type="color" />
<LabeledInput label="Color" path={colorPath} type="color" />
<LabeledInput label="Message" path={messagePath} width="300px" />
<LabeledSelect label="Side" omitEmpty options={sideOptions} path={sidePath} />
<LabeledSelect
  label="Position"
  omitEmpty
  on:value={event => (position = event.detail)}
  options={positionOptions}
  value={position} />
<LabeledToggle label="Show" path={showPath} />

<Toast
  {backgroundColor}
  {color}
  {message}
  {side}
  bind:show={$globalStore.toast.show}
  {position} />
