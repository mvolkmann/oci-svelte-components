import List from '../src/List.svelte';

export default {title: 'List'};

const items = ['Apple', 'Banana', 'Cherry', 'Grape'];

export const ordered = () => ({
  Component: List,
  props: {items, numbered: true}
});

export const unordered = () => ({
  Component: List,
  props: {items}
});
