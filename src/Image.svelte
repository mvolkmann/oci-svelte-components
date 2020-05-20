<script>
  export let className = '';
  export let description;
  export let height = undefined;
  export let url;
  export let style = '';
  export let width = undefined;

  if (height) style += `; height: ${height}`;
  if (width) style += `; width: ${width}`;

  const classes = 'image' + (className ? ' ' + className : '');
</script>

<img alt={description} class={classes} src={url} {style} title={description} />

<style>
  img {
    display: inline-block;
    object-fit: contain;
    padding: 0;
    height: var(--image-height);
    width: var(--image-width);
  }
</style>
