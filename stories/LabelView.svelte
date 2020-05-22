<script>
  import get from 'lodash-es/get';
  import Input from '../src/Input.svelte';
  import Label from '../src/Label.svelte';
  import {globalStore} from '../src/stores';
  import Toggle from '../src/Toggle.svelte';

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

<Input label="Info" path={infoPath} />
<Input label="Text" path={textPath} />
<Toggle label="required" path={requiredPath} />
<Label {info} {required} {text} />
