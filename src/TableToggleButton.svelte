<script>
  export let className = '';
  export let label;
  export let onClick;
  export let selectedButton;

  const classes =
    (label === selectedButton ? 'selected' : '') +
    (className ? ' ' + className : '');
</script>

<button class={classes} on:click={onClick}>{label}</button>
