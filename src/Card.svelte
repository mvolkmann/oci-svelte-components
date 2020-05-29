<script>
  import Image from './Image.svelte';

  const PLAYING_CARD_RATIO = 2.5 / 3.5;

  export let className = undefined;
  export let height = '320';
  export let imageUrl;
  export let text;
  export let title;
  export let width = height * PLAYING_CARD_RATIO;

  const classes = 'card' + (className ? ' ' + className : '');
  const style = `--height: ${height}px; ` + `--width: ${width}px`;
</script>

<div class={classes} {style}>
  <Image description={title} url={imageUrl} height="50%" />
  <div class="bottom">
    <div class="title">{title}</div>
    <div class="text">{text}</div>
  </div>
</div>

<style>
  .bottom {
    flex-grow: 1;
    overflow-y: hidden;

    display: inline-flex;
    flex-direction: column;
  }

  .card {
    display: inline-flex;
    flex-direction: column;

    background-color: var(--osc-card-background-color, linen);
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #666;
    height: var(--height);
    overflow-y: hidden;
    padding: 1rem;
    width: var(--width);
  }

  .text {
    flex-grow: 1;
    font-size: 0.8rem;
    overflow-y: scroll;
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1rem 0;
    text-align: center;
  }
</style>
