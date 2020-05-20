import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import Icon from '../src/Icon.svelte';

export default {title: 'Icon'};

export const heart = () => ({
  Component: Icon,
  props: {color: 'red', icon: solid.faHeart, size: '5rem'}
});

export const js = () => ({
  Component: Icon,
  props: {color: '#ECDC68', icon: brands.faJs, size: '200px'}
});

export const node = () => ({
  Component: Icon,
  props: {color: '#2F6D1C', icon: brands.faNode, size: '200px'}
});
