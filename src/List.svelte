<script>
  export let className = undefined;
  export let items;
  export let numbered = false;

  const classes = 'list' + (className ? ' ' + className : '');

  $: elementName = numbered ? 'ol' : 'ul';

  let html;
  $: {
    html = `<${elementName} class="${classes}">`;
    for (const item of items) {
      html += `<li>${item.toString()}</li>`;
    }
    html += `</${elementName}>`;
  }
</script>

{@html html}
