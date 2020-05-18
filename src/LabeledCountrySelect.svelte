<script>
  import LabeledSelect from './LabeledSelect.svelte';
  import options from './countries';

  export let className = '';
  export let placeholder = '';
  export let required = false;
  export let statePath;
  export let vertical = false;
</script>

<LabeledSelect
  {className}
  label="Country"
  on:change
  {options}
  {placeholder}
  {required}
  {statePath}
  {vertical} />
