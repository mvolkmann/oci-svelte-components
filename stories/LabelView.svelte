<script>
  import get from 'lodash-es/get';
  import Label from '../src/Label.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';
  import {globalStore} from '../src/stores';

  const infoPath = 'label.info';
  const requiredPath = 'label.required';
  const textPath = 'label.text';

  globalStore.set({
    label: {
      info: '',
      required: false,
      text: 'My Label'
    }
  });

  $: label = get($globalStore, 'label');
  $: ({info, required, text} = label);
</script>

<LabeledInput label="Info" path={infoPath} />
<LabeledInput label="Text" path={textPath} />
<LabeledToggle label="required" path={requiredPath} />
<Label {info} {required} {text} />
