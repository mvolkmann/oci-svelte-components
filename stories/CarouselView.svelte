<script>
  import {globalStore} from '../src/stores';
  import Carousel from '../src/Carousel.svelte';
  import Image from '../src/Image.svelte';
  import Input from '../src/Input.svelte';
  import Toggle from '../src/Toggle.svelte';

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

<Input
  label="Elements per Page"
  min={1}
  type="number"
  path="carousel.elementsPerPage"
  width="26px" />

<Input
  info="in pixels"
  label="Element Margin"
  min={0}
  type="number"
  path="carousel.elementMargin"
  width="40px" />

<Toggle label="Show Dots" path="carousel.showDots" />

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
