<script>
  import {globalStore} from '../src/stores';
  import Card from '../src/Card.svelte';
  import Input from '../src/Input.svelte';

  globalStore.set({
    card: {
      imageUrl: 'https://avatars0.githubusercontent.com/u/79312?s=460&v=4',
      text:
        'Mark Volkmann is a partner at Object Computing, Inc. (OCI) in St. Louis where he provides software consulting and training. He has assisted many companies with JavaScript, Node.js, Svelte, React, Vue, Angular, and more. Mark is the author of the Manning book "Svelte and Sapper in Action".',
      title: 'Mark Volkmann'
    }
  });

  $: ({imageUrl, text, title} = $globalStore.card);
</script>

<Input label="Image URL" path="card.imageUrl" type="url" vertical />
<Input label="Title" path="card.title" vertical />
<Input label="Text" path="card.text" rows={5} vertical width="500px" />
<Card {imageUrl} {text} {title} />
