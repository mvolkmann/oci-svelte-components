import Hello from '../src/Hello.svelte';

export default {title: 'Hello'};

export const noName = () => ({Component: Hello});

export const name = () => ({
  Component: Hello,
  props: {name: 'Mark'}
});
