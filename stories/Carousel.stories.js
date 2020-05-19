import Carousel from '../src/Carousel.svelte';
import Image from '../src/Image.svelte';

export default {title: 'Carousel'};

const images = [
  {description: 'Dasher', url: 'images/whippet.jpg'},
  {description: 'Maisey', url: 'images/treeing-walker-coonhound.jpg'},
  {
    description: 'Ramsay',
    url: 'images/native-american-indian-dog.jpg'
  },
  {description: 'Oscar', url: 'images/german-shorthaired-pointer.jpg'}
];
const carouselElementWidth = 200;
const carouselData = images.map(({description, url}) => ({
  component: Image,
  props: {
    description,
    url,
    width: carouselElementWidth + 'px'
  }
}));
console.log('Carousel.stories.js x: carouselData =', carouselData);

export const basic = () => ({
  Component: Carousel,
  props: {
    elements: carouselData,
    elementWidth: carouselElementWidth,
    height: 396,
    showDots: true
  }
});
