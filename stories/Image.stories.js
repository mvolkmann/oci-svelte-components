import Image from '../src/Image.svelte';

export default {title: 'Image'};

export const dasher = () => ({
  Component: Image,
  props: {description: 'Dasher', url: 'images/whippet.jpg', width: '200px'}
});
