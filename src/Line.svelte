<script>
  export let line;

  const re = /\*\*.+?\*\*/g;
  let spans = [];
  let lastIndex = 0;
  let match;
  let text;

  while ((match = re.exec(line)) !== null) {
    const start = match.index;
    const end = re.lastIndex;
    if (start > lastIndex) {
      const text = line.substring(lastIndex, start);
      spans.push({bold: false, text});
    }
    const text = line.substring(start + 2, end - 2);
    spans.push({bold: true, text});
    lastIndex = end;
  }

  text = line.substring(lastIndex);
  if (text) spans.push({bold: false, text});
</script>

<div>
  {#each spans as {bold, text}}
    {#if bold}
      <b>{text}</b>
      );
    {:else}{text}{/if}
  {/each}
</div>
