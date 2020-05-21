<script>
  import get from 'lodash-es/get';
  import {globalStore} from '../src/stores';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledSelect from '../src/LabeledSelect.svelte';
  import LabeledSlider from '../src/LabeledSlider.svelte';
  import LabeledState from '../src/LabeledState.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

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

<LabeledInput label="Info" path="labeledInput.info" />
<LabeledInput label="Label" path="labeledInput.label" />
<LabeledInput label="Placeholder" path="labeledInput.placeholder" />
<LabeledToggle label="Required" path="labeledInput.required" />
<LabeledSelect
  label="Type"
  omitEmpty
  options={typeOptions}
  path="labeledInput.type" />
<LabeledToggle label="Vertical" path="labeledInput.vertical" />
<LabeledSlider
  info="in pixels"
  label="width"
  min={20}
  max="400"
  path="labeledInput.width"
  showLimits
  showValue />

<LabeledInput
  {info}
  {label}
  path="labeledInput.value"
  {placeholder}
  {required}
  {type}
  {vertical}
  width={width + 'px'} />
<LabeledState label="You entered" path="labeledInput.value" />
