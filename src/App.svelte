<script>
  import get from 'lodash/get';
  import LabeledInput from './LabeledInput.svelte';
  import {globalStore, setState} from './stores';

  const firstNamePath = 'user.profile.firstName';
  const lastNamePath = 'user.profile.lastName';
  setState(firstNamePath, 'John');
  setState(lastNamePath, 'Doe');

  $: firstName = get($globalStore, firstNamePath);
  $: lastName = get($globalStore, lastNamePath);
</script>

<main>
  <h1>Hello {firstName} {lastName}!</h1>

  <LabeledInput
    info={'This is\na **tool** tip.'}
    label="First Name"
    placeholder="First Name"
    statePath={firstNamePath} />

  <LabeledInput
    info={'This is\nanother **tool** tip.'}
    label="Last Name"
    placeholder="Last Name"
    statePath={lastNamePath}
    vertical />
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
