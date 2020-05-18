<script>
  import LabeledSelect from './LabeledSelect.svelte';
  import options from './countries';

  export let className = '';
  export let path = undefined;
  export let placeholder = '';
  export let required = false;
  export let store = undefined;
  export let vertical = false;
</script>

<LabeledSelect
  {className}
  label="Country"
  on:value
  {options}
  {path}
  {placeholder}
  {required}
  {store}
  {vertical} />
