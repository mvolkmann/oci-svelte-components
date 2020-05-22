<script>
  export let className = undefined;
  export let items;
  export let numbered = false;

  const classes = 'list' + (className ? ' ' + className : '');

  $: elementName = numbered ? 'ol' : 'ul';

  let html;
  $: {
    html = `<${elementName}>`;
    for (const item of items) {
      html += `<li>${item.toString()}</li>`;
    }
    html += `</${elementName}>`;
  }
</script>

<div class={classes}>
  {@html html}
</div>

<style>
  .list :global(li) {
    margin: 0.25rem 0;
  }
</style>
