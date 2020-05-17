import Line from '../src/Line.svelte';

export default {title: 'Line'};

export const basic = () => ({
  Component: Line,
  props: {line: 'This is\na **fancy**\nline.'}
});
