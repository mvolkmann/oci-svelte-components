<script>
  import LabeledCountrySelect from '../src/LabeledCountrySelect.svelte';
  import LabeledState from '../src/LabeledState.svelte';

  const path = 'user.profile.address.country';
</script>

<LabeledCountrySelect label="Country" {path} />
<LabeledState defaultValue="nothing" label="You selected" {path} />
