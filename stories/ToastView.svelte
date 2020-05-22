<script>
  import get from 'lodash-es/get';
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
      side: 'top'
    }
  });

  const backgroundColorPath = 'toast.backgroundColor';
  const colorPath = 'toast.color';
  const messagePath = 'toast.message';
  const showPath = 'toast.show';
  const sidePath = 'toast.side';
  const useTimeoutPath = 'toast.useTimeout';

  const sideOptions = ['top', 'bottom', 'left', 'right'];
  const horizontalPositionOptions = ['left', 'center', 'right'];
  const verticalPositionOptions = ['top', 'center', 'bottom'];

  $: toast = $globalStore.toast;
  $: ({backgroundColor, color, message, side} = toast);

  let position;
  let positionOptions = [];

  $: useTimeout = get($globalStore, useTimeoutPath);

  $: if (side) {
    positionOptions =
      side === 'top' || side === 'bottom'
        ? horizontalPositionOptions
        : verticalPositionOptions;
    position = positionOptions[0];
  }
</script>

<Input label="Background Color" path={backgroundColorPath} type="color" />
<Input label="Color" path={colorPath} type="color" />
<Input label="Message" path={messagePath} width="300px" />
<Select label="Side" omitEmpty options={sideOptions} path={sidePath} />
<Select
  label="Position"
  omitEmpty
  on:value={event => (position = event.detail)}
  options={positionOptions}
  value={position} />
<Toggle info="2 seconds" label="Use Timeout" path={useTimeoutPath} />
<Toggle label="Show" path={showPath} />

<Toast
  {backgroundColor}
  {color}
  {message}
  {side}
  bind:show={$globalStore.toast.show}
  {position}
  timeoutMs={useTimeout ? 2000 : 0} />
