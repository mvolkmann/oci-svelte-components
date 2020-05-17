import LabeledView from './LabeledView.svelte';

export default {title: 'Labeled'};

export const horizontalOnLeft = () => ({
  Component: LabeledView,
  props: {label: 'My Label'}
});

export const horizontalOnRight = () => ({
  Component: LabeledView,
  props: {label: 'My Label', onRight: true}
});

export const vertical = () => ({
  Component: LabeledView,
  props: {label: 'My Label', vertical: true}
});
