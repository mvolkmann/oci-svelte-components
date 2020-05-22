<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import Input from '../src/Input.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Select from '../src/Select.svelte';
  import Slider from '../src/Slider.svelte';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({
    labeledInput: {
      info: '',
      label: 'My Label',
      placeholder: '',
      required: false,
      type: 'text',
      vertical: false,
      width: 200
    }
  });

  const typeOptions = [
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ];

  $: labeledInput = get($globalStore, 'labeledInput');
  $: ({
    info,
    label,
    placeholder,
    required,
    type,
    vertical,
    width
  } = labeledInput);
</script>

<Input label="Info" path="labeledInput.info" />
<Input label="Label" path="labeledInput.label" />
<Input label="Placeholder" path="labeledInput.placeholder" />
<Toggle label="Required" path="labeledInput.required" />
<Select label="Type" omitEmpty options={typeOptions} path="labeledInput.type" />
<Toggle label="Vertical" path="labeledInput.vertical" />
<Slider
  info="in pixels"
  label="Width"
  min={20}
  max="400"
  path="labeledInput.width"
  showLimits
  showValue />

<Input
  {info}
  {label}
  path="labeledInput.value"
  {placeholder}
  {required}
  {type}
  {vertical}
  width={width + 'px'} />
<LabeledState label="You entered" path="labeledInput.value" />
