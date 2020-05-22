<script>
  import {globalStore} from '../src/stores';
  import Input from '../src/Input.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import Select from '../src/Select.svelte';
  import Slider from '../src/Slider.svelte';
  import Toggle from '../src/Toggle.svelte';

  globalStore.set({
    input: {
      info: '',
      label: 'My Label',
      placeholder: '',
      required: false,
      rows: 1,
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

  $: ({
    info,
    label,
    placeholder,
    required,
    rows,
    type,
    vertical,
    width
  } = $globalStore.input);
</script>

<Input label="Info" path="input.info" />
<Input label="Label" path="input.label" />
<Input label="Placeholder" path="input.placeholder" />
<Toggle label="Required" path="input.required" />
<Select label="Type" omitEmpty options={typeOptions} path="input.type" />
<Input label="Rows" max={10} min={1} path="input.rows" type="number" />
<Toggle label="Vertical" path="input.vertical" />
<Slider
  info="in pixels"
  label="Width"
  min={20}
  max="400"
  path="input.width"
  showLimits
  showValue />

<Input
  {info}
  {label}
  path="input.value"
  {placeholder}
  {required}
  {rows}
  {type}
  {vertical}
  width={width + 'px'} />
<LabeledState label="You entered" path="input.value" />
