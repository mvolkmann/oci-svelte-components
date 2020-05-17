import {action} from '@storybook/addon-actions';

import DemoButton from './DemoButton.svelte';

export default {
  title: 'DemoButton',
  component: DemoButton
};

export const Text = () => ({
  Component: DemoButton,
  props: {text: 'Hello Button'},
  on: {click: action('clicked')}
});

export const Emoji = () => ({
  Component: DemoButton,
  props: {
    text: '😀 😎 👍 💯'
  },
  on: {click: action('clicked')}
});
