<script>
  import Input from '../src/Input.svelte';
  import Select from '../src/Select.svelte';
  import {globalStore} from '../src/stores';
  import Toast from '../src/Toast.svelte';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({
    toast: {
      backgroundColor: '#ffa500',
      color: '#ffffff',
      message: 'This is a\\n**toast** message.',
      show: false,
      side: 'top',
      useTimeout: false
    }
  });

  const sideOptions = ['top', 'bottom', 'left', 'right'];
  const horizontalPositionOptions = ['left', 'center', 'right'];
  const verticalPositionOptions = ['top', 'center', 'bottom'];

  $: toast = $globalStore.toast;
  $: ({backgroundColor, color, message, side, useTimeout} = toast);

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

<Input label="Background Color" path="toast.backgroundColor" type="color" />
<Input label="Color" path="toast.color" type="color" />
<Input label="Message" path="toast.message" width="300px" />
<Select label="Side" omitEmpty options={sideOptions} path="toast.side" />
<Select
  label="Position"
  omitEmpty
  on:value={event => (position = event.detail)}
  options={positionOptions}
  value={position} />
<Toggle info="2 seconds" label="Use Timeout" path="toast.useTimeout" />
<Toggle label="Show" path="toast.show" />

<Toast
  {backgroundColor}
  {color}
  {message}
  {side}
  bind:show={$globalStore.toast.show}
  {position}
  timeoutMs={useTimeout ? 2000 : 0} />
