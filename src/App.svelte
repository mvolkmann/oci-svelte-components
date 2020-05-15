<script>
  import get from 'lodash/get';
  import Button from './Button.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import {globalStore, setState} from './stores';

  const colorPath = 'user.profile.favoriteColor';
  const firstNamePath = 'user.profile.firstName';
  const happyPath = 'user.profile.happy';
  const lastNamePath = 'user.profile.lastName';
  const middleNamePath = 'user.profile.middleName';

  setState(firstNamePath, 'John');
  setState(lastNamePath, 'Doe');

  $: firstName = get($globalStore, firstNamePath);
  $: lastName = get($globalStore, lastNamePath);

  $: console.log('App.svelte: $globalStore =', $globalStore);

  const colorOptions = ['red', 'green', 'blue'];

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
      placeholder="First Name"
      required
      statePath={firstNamePath} />

    <LabeledInput label="Middle Name" statePath={middleNamePath} />

    <LabeledInput
      info={'This is\na **fancy** pants\n tooltip.'}
      label="Last Name"
      placeholder="Last Name"
      statePath={lastNamePath} />

    <LabeledInput label="Happy" statePath={happyPath} type="checkbox" />

    <LabeledSelect
      label="Favorite Color"
      options={colorOptions}
      statePath={colorPath}
      vertical />

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
