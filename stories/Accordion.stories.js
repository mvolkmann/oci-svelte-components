import Accordion from '../src/Accordion.svelte';
import Hello from '../src/Hello.svelte';

export default {title: 'Accordion'};

const accordionData = [
  {
    title: 'Title #1',
    component: Hello,
    props: {name: 'Mark'}
  },
  {
    title: 'Title #2',
    component: Hello,
    props: {name: 'Tami'}
  },
  {
    title: 'Title #3',
    component: Hello,
    props: {name: 'Dasher'}
  }
];

export const horizontal = () => ({
  Component: Accordion,
  props: {data: accordionData, horizontal: true}
});

export const vertical = () => ({
  Component: Accordion,
  props: {data: accordionData}
});
