<script>
  import get from 'lodash-es/get';
  import Address from './Address.svelte';
  import Button from './Button.svelte';
  import Dial from './Dial.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledInputPath from './LabeledInputPath.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import LabeledSlider from './LabeledSlider.svelte';
  import LabeledState from './LabeledState.svelte';
  import LabeledToggle from './LabeledToggle.svelte';
  import State from './State.svelte';
  import ToggleButtons from './ToggleButtons.svelte';
  import {globalStore, setState} from './stores';

  const addressPath = 'user.profile.address';
  const colorPath = 'user.favoriteColor';
  const firstNamePath = 'user.profile.firstName';
  const flavorPath = 'user.favoriteFlavor';
  const happyPath = 'user.happy';
  const lastNamePath = 'user.profile.lastName';
  const middleNamePath = 'user.profile.middleName';

  setState(firstNamePath, 'John');
  setState(lastNamePath, 'Doe');

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
    <LabeledInputPath
      info={'basic tooltip'}
      label="First Name"
      placeholder="First Name"
      required
      statePath={firstNamePath} />

    <LabeledInputPath label="Middle Name" statePath={middleNamePath} />
    <State component={LabeledInput} label="Middle Name" path={middleNamePath} />

    <LabeledInputPath
      info={'This is\na **fancy** pants\n tooltip.'}
      label="Last Name"
      placeholder="Last Name"
      statePath={lastNamePath}
      vertical />

    <LabeledInputPath label="Happy" statePath={happyPath} type="checkbox" />
    <LabeledToggle label="Happy" statePath={happyPath} />
    <LabeledToggle label="Happy" statePath={happyPath} vertical />

    <ToggleButtons options={flavorOptions} statePath={flavorPath} />

    <LabeledRadioButtons
      label="Favorite Flavor"
      name="flavor"
      options={flavorOptions}
      statePath={flavorPath} />

    <LabeledRadioButtons
      label="Favorite Flavor"
      name="flavor2"
      options={flavorOptions}
      statePath={flavorPath}
      vertical />

    <LabeledSelect
      label="Favorite Color"
      options={colorOptions}
      statePath={colorPath} />

    <LabeledSelect
      label="Favorite Color"
      options={colorOptions}
      statePath={colorPath}
      vertical />

    <LabeledInputPath
      label="Age"
      min="0"
      max="100"
      statePath="user.age"
      type="number" />
    <LabeledSlider label="Age" statePath="user.age" />
    <LabeledSlider label="Age" statePath="user.age" vertical width="20rem" />
    <Dial label="Age" statePath="user.age" />
    <LabeledState label="Age" statePath="user.age" />
    <LabeledState
      formatter={n => Number(n) + 100}
      label="Age"
      statePath="user.age"
      vertical />

    <Address statePath={addressPath} vertical />

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
