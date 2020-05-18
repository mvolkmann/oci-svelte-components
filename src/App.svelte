<script>
  import get from 'lodash-es/get';
  import Address from './Address.svelte';
  import Button from './Button.svelte';
  import Dial from './Dial.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import LabeledSlider from './LabeledSlider.svelte';
  import LabeledState from './LabeledState.svelte';
  import LabeledToggle from './LabeledToggle.svelte';
  import State from './State.svelte';
  import Toast from './Toast.svelte';
  import ToggleButtons from './ToggleButtons.svelte';
  import {globalStore, update} from './stores';

  const addressPath = 'user.profile.address';
  const colorPath = 'user.favoriteColor';
  const firstNamePath = 'user.profile.firstName';
  const flavorPath = 'user.favoriteFlavor';
  const happyPath = 'user.happy';
  const lastNamePath = 'user.profile.lastName';
  const middleNamePath = 'user.profile.middleName';

  update(globalStore, firstNamePath, 'John');
  update(globalStore, lastNamePath, 'Doe');

  $: firstName = get($globalStore, firstNamePath);
  $: lastName = get($globalStore, lastNamePath);

  $: console.log('App.svelte: $globalStore =', $globalStore);

  const colorOptions = ['red', 'green', 'blue'];
  const flavorOptions = ['vanilla', 'strawberry', 'chocolate'];

  function handleSubmit() {
    alert('got submit');
  }
</script>

<main>
  <h1>Hello {firstName} {lastName}!</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <LabeledInput
      info={'basic tooltip'}
      label="First Name"
      path={firstNamePath}
      placeholder="First Name"
      required />

    <LabeledInput label="Middle Name" path={middleNamePath} />
    <State component={LabeledInput} label="Middle Name" path={middleNamePath} />

    <LabeledInput
      info={'This is\na **fancy** pants\n tooltip.'}
      label="Last Name"
      path={lastNamePath}
      placeholder="Last Name"
      vertical />

    <LabeledInput label="Happy" path={happyPath} type="checkbox" />
    <LabeledToggle label="Happy" path={happyPath} />
    <LabeledToggle label="Happy" path={happyPath} vertical />
    <Toast
      message="I am glad\nyou are happy!"
      path={happyPath}
      timeoutMs={3000} />

    <ToggleButtons options={flavorOptions} path={flavorPath} />

    <LabeledRadioButtons
      label="Favorite Flavor"
      name="flavor"
      options={flavorOptions}
      path={flavorPath} />

    <LabeledRadioButtons
      label="Favorite Flavor"
      name="flavor2"
      options={flavorOptions}
      path={flavorPath}
      vertical />

    <LabeledSelect
      label="Favorite Color"
      options={colorOptions}
      path={colorPath} />

    <LabeledSelect
      label="Favorite Color"
      options={colorOptions}
      path={colorPath}
      vertical />

    <LabeledInput label="Age" min="0" max="100" path="user.age" type="number" />
    <LabeledSlider label="Age" path="user.age" />
    <LabeledSlider label="Age" path="user.age" vertical width="20rem" />
    <Dial label="Age" path="user.age" />
    <LabeledState label="Age" path="user.age" />
    <LabeledState
      formatter={n => Number(n) + 100}
      label="Age"
      path="user.age"
      vertical />

    <Address path={addressPath} vertical />

    <Button label="Submit" type="submit" />
  </form>
</main>

<style>
  main {
    margin: 0 auto;
    padding: 1rem;
  }

  h1 {
    color: #ff3e00;
    font-size: 2em;
    margin-top: 0;
  }
</style>
