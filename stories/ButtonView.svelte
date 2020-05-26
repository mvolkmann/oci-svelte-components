<script>
  import {action} from '@storybook/addon-actions';
  import Button from '../src/Button.svelte';
</script>

<Button on:click={action('clicked')}>Press Me</Button>
