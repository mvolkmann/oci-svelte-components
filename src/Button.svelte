<script>
  import {createEventDispatcher} from 'svelte';

  export let asLink = false;
  export let className = '';
  export let label;
  export let type = 'text'; // not 'submit'

  const dispatch = createEventDispatcher();

  const classes =
    'button' + (className ? ' ' + className : '') + (asLink ? ' as-link' : '');
</script>

<button className={classes} on:click={() => dispatch('click')} {type}>
  {label}
</button>

<style lang="scss">
  button {
    background-color: var(--primary-color);
    border: none;
    border-radius: var(--border-radius, 0);
    color: white;
    display: inline-block;
    font-size: var(--button-font-size, 1rem);
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-transform: uppercase;

    &.as-link {
      background-color: transparent;
      border: none !important;
      color: var(--primary-color);
      font-weight: 300;
      padding-left: 0;
      padding-right: 0;
      text-decoration: underline;
      text-transform: none;
    }

    &:focus {
      outline-color: var(--secondary-color);
    }
  }
</style>
