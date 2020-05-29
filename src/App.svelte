<script>
  import * as solid from '@fortawesome/free-solid-svg-icons';

  import get from 'lodash-es/get';
  import Accordion from './Accordion.svelte';
  import Address from './Address.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Carousel from './Carousel.svelte';
  import Dial from './Dial.svelte';
  import Hello from './Hello.svelte';
  import Icon from './Icon.svelte';
  import Image from './Image.svelte';
  import Input from './Input.svelte';
  import RadioButtons from './RadioButtons.svelte';
  import Select from './Select.svelte';
  import Slider from './Slider.svelte';
  import LabeledState from './LabeledState.svelte';
  import Toggle from './Toggle.svelte';
  import List from './List.svelte';
  import State from './State.svelte';
  import Toast from './Toast.svelte';
  import ToggleButtons from './ToggleButtons.svelte';
  import {globalStore} from './stores';

  const colorPath = 'user.favoriteColor';
  const flavorPath = 'user.favoriteFlavor';
  const happyPath = 'user.happy';
  const middleNamePath = 'user.profile.middleName';

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

  const images = [
    {description: 'Dasher', url: 'images/whippet.jpg'},
    {description: 'Maisey', url: 'images/treeing-walker-coonhound.jpg'},
    {description: 'Ramsay', url: 'images/native-american-indian-dog.jpg'},
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

  let isHappy = false;
  let showToast = false;

  $: user = get($globalStore, 'user');
  $: ({happy, profile} = user);
  $: ({firstName, lastName} = profile);

  // Detect change from unhappy to happy.
  $: if (!isHappy && happy) {
    isHappy = true;
    showToast = true; // only on change to happy
  }

  // Detect change to unhappy.
  $: if (!happy) isHappy = false;

  const colorOptions = ['red', 'green', 'blue'];
  const flavorOptions = ['vanilla', 'strawberry', 'chocolate'];

  function handleSubmit() {
    alert('got submit');
  }
</script>

<main>
  <h1>Hello {firstName} {lastName}!</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <List items={['apple', 'banana', 'cherry']} />

    <Icon color="red" icon={solid.faHeart} size="3rem" />

    <Input
      info={'basic tooltip'}
      label="First Name"
      path="user.profile.firstName"
      placeholder="First Name"
      required />

    <Input label="Middle Name" path={middleNamePath} />
    <State component={Input} label="Middle Name" path={middleNamePath} />

    <Input
      info={'This is\na **fancy** pants\n tooltip.'}
      label="Last Name"
      path="user.profile.lastName"
      placeholder="Last Name"
      vertical />

    <Input label="Happy" path={happyPath} type="checkbox" />
    <Toggle label="Happy" path={happyPath} />
    <Toggle label="Happy" path={happyPath} vertical />
    <Toast
      message="I am so glad\nyou are happy!"
      bind:show={showToast}
      timeoutMs={3000} />

    <ToggleButtons options={flavorOptions} path={flavorPath} />

    <RadioButtons
      label="Favorite Flavor"
      name="flavor"
      options={flavorOptions}
      path={flavorPath} />

    <RadioButtons
      label="Favorite Flavor"
      name="flavor2"
      options={flavorOptions}
      path={flavorPath}
      vertical />

    <Select label="Favorite Color" options={colorOptions} path={colorPath} />

    <Select
      label="Favorite Color"
      options={colorOptions}
      path={colorPath}
      vertical />

    <Input label="Age" min="0" max="100" path="user.age" type="number" />
    <Slider label="Age" path="user.age" />
    <Slider
      label="Age"
      path="user.age"
      showLimits
      showValue
      vertical
      width="20rem" />
    <Dial label="Age" path="user.age" />
    <LabeledState label="Age" path="user.age" />
    <LabeledState
      formatter={n => Number(n) + 100}
      label="Age"
      path="user.age"
      vertical />

    <Address path="user.profile.address" vertical />

    <div>
      <Accordion data={accordionData} />
    </div>

    <div>
      <Accordion data={accordionData} drawerWidth="200px" horizontal />
    </div>

    <div>
      <Carousel
        elements={carouselData}
        elementWidth={carouselElementWidth}
        height={396}
        showDots />
    </div>
    <div>
      <Carousel
        elements={carouselData}
        elementMargin={20}
        elementsPerPage={2}
        elementWidth={carouselElementWidth}
        height={396}
        showDots />
    </div>

    <div>
      <Card
        imageUrl="https://avatars0.githubusercontent.com/u/79312?s=460&v=4"
        text="This is a demo card."
        title="Demo Card" />
    </div>

    <Button type="submit">Submit</Button>
  </form>
</main>

<style>
  main {
    margin: 0 auto;
    padding: 1rem;
  }

  form :global(.icon) {
    color: green;
    font-size: 5rem;
  }

  h1 {
    color: #ff3e00;
    font-size: 2em;
    margin-top: 0;
  }
</style>
