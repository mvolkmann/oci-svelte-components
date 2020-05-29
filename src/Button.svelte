<script>
  export let asLink = false;
  export let bare = false;
  export let className = '';
  export let disabled = false;
  export let primary = false;
  export let type = 'button'; // not 'submit'

  $: classes =
    'osc-button' +
    (asLink ? ' as-link' : '') +
    (bare ? ' bare' : '') +
    (className ? ' ' + className : '') +
    (primary ? ' primary' : '');
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
    --color: var(--osc-disabled-color, lightgray);
    border-color: var(--color);
    color: var(--color);
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

  button.bare {
    background-color: transparent;
    border: none;
    margin: 0;
    outline: none;
    padding: 0;
  }

  button:focus {
    outline-color: var(--osc-secondary-color, orange);
  }

  .primary {
    background-color: var(--osc-primary-color, cornflowerblue) !important;
    color: white;
  }
</style>
