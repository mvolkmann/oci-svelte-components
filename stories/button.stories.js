import {action} from '@storybook/addon-actions';
import Button from '../src/Button.svelte';

export default {title: 'Button'};

export const basic = () => ({
  Component: Button,
  props: {label: 'Press Me'},
  on: {click: action('clicked')}
});
