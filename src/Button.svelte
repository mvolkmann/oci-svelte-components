<script>
  import {createEventDispatcher} from 'svelte';

  export let asLink = false;
  export let className = '';
  export let label;
  export let type = 'button'; // not 'submit'

  const dispatch = createEventDispatcher();

  const classes =
    'osc-button' +
    (className ? ' ' + className : '') +
    (asLink ? ' as-link' : '');
</script>

<button class={classes} on:click={() => dispatch('click')} {type}>
  {label}
</button>

<style>
  button {
    background-color: var(--osc-primary-color, gray);
    border: none;
    border-radius: var(--osc-border-radius, 0);
    color: white;
    display: inline-block;
    font-size: var(--osc-button-font-size, 1rem);
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
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
</style>
