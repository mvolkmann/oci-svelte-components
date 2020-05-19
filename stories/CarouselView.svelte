<script>
  import {globalStore} from '../src/stores';
  import Carousel from '../src/Carousel.svelte';
  import Image from '../src/Image.svelte';
  import LabeledInput from '../src/LabeledInput.svelte';
  import LabeledToggle from '../src/LabeledToggle.svelte';

  globalStore.set({
    carousel: {elementMargin: 0, elementsPerPage: 1, showDots: false}
  });

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
  const height = 396;
</script>

<LabeledInput
  label="Elements per Page"
  type="number"
  path="carousel.elementsPerPage" />

<LabeledInput
  label="Element Margin"
  type="number"
  path="carousel.elementMargin" />

<LabeledToggle label="Show Dots" path="carousel.showDots" />

<Carousel
  elements={carouselData}
  elementsPerPage={$globalStore.carousel.elementsPerPage}
  elementMargin={$globalStore.carousel.elementMargin}
  elementWidth={carouselElementWidth}
  {height}
  showDots={$globalStore.carousel.showDots} />

<style>
  :global(body) {
    font-family: sans-serif;
  }
</style>
