<script>
  import Button from './Button.svelte';

  export let className = '';
  export let label;
  export let onClick;
  export let selectedButton;

  const classes =
    (label === selectedButton ? 'selected' : '') +
    (className ? ' ' + className : '');
</script>

<Button className={classes} on:click={onClick}>{label}</Button>
