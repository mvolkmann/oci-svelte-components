<script>
  import Button from './Button.svelte';

  export let className = '';
  export let label;
  export let selectedLabel;

  const classes =
    (label === selectedLabel ? 'selected' : '') +
    (className ? ' ' + className : '');
</script>

<Button className={classes} on:click>{label}</Button>
