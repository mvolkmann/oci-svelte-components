<script>
  export let asLink = false;
  export let className = '';
  export let disabled = false;
  export let type = 'button'; // not 'submit'

  $: classes =
    'osc-button' +
    (className ? ' ' + className : '') +
    (asLink ? ' as-link' : '');
</script>

<button class={classes} {disabled} on:click {type}>
  <slot />
</button>

<style>
  button {
    --color: var(--osc-primary-color, cornflowerblue);
    border: solid var(--color) 1px;
    border-radius: var(--osc-border-radius, 4px);
    color: var(--color);
    display: inline-block;
    font-size: var(--osc-button-font-size, 1rem);
    font-weight: bold;
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
  }

  button:disabled {
    border-color: lightgray;
    color: lightgray;
  }

  button.as-link {
    background-color: transparent;
    border: none !important;
    color: var(--osc-primary-color, cornflowerblue);
    padding-left: 0;
    padding-right: 0;
    text-decoration: underline;
    text-transform: none;
  }

  button:focus {
    outline-color: var(--osc-secondary-color, orange);
  }

  .primary {
    background-color: var(--osc-primary-color, cornflowerblue);
    color: white;
  }
</style>
