<script>
  export let className = '';
  export let elements;
  export let elementMargin = 0;
  export let elementsPerPage = 1;
  export let elementWidth;
  export let height;
  export let showDots = false;

  let pageIndex = 0;
  let containerRef;

  const classes = 'carousel' + (className ? ' ' + className : '');

  $: maxPageIndex = Math.ceil(elements.length / elementsPerPage) - 1;
  $: dotArray = Array(maxPageIndex + 1);
  $: advanceWidth = (elementWidth + elementMargin) * elementsPerPage;
  $: pageWidth = elementMargin + advanceWidth;
  $: centerStyle = `height: ${height}px; width: ${pageWidth}px;`;
  $: containerStyle = `padding-left: ${elementMargin}px;`;

  $: if (containerRef) {
    const elements = containerRef.querySelectorAll('*');
    for (const element of elements) {
      element.style.marginRight = elementMargin + 'px';
    }
  }

  $: updateLeft(pageIndex);

  function slideLeft() {
    if (pageIndex > 0) pageIndex--;
  }

  function slideRight() {
    if (pageIndex < maxPageIndex) pageIndex++;
  }

  function updateLeft(pageIndex) {
    if (containerRef) {
      containerRef.style.left = -pageIndex * advanceWidth + 'px';
    }
  }
</script>

<div class={classes}>
  <section>
    <div class="left">
      <button disabled={pageIndex === 0} on:click={slideLeft} type="button">
        &lt;
      </button>
    </div>
    <div class="center" style={centerStyle}>
      <div bind:this={containerRef} class="container" style={containerStyle}>
        {#each elements as element}
          <svelte:component this={element.component} {...element.props} />
        {/each}
      </div>
    </div>
    <div class="right">
      <button
        disabled={pageIndex === maxPageIndex}
        on:click={slideRight}
        type="button">
        &gt;
      </button>
    </div>
  </section>
  {#if showDots}
    <footer>
      {#each dotArray as _, index}
        <button
          class={'dot' + (index === pageIndex ? ' current' : '')}
          on:click={() => (pageIndex = index)} />
      {/each}
    </footer>
  {/if}
</div>

<style>
  .carousel {
    display: inline-flex;
    align-items: center;
    flex-direction: column;

    margin-bottom: 1rem;
  }

  .carousel :global(button:disabled) {
    color: lightgray;
  }

  .center {
    /* height: fit-content; */
    overflow-x: hidden;
    position: relative;
  }

  .container {
    display: flex;
    align-items: center;

    background-color: lightgray;
    position: absolute;
    left: 0;
    transition-duration: 1s;
    transition-property: left;
  }

  footer .dot {
    --size: 10px;
    height: var(--size);
    width: var(--size);
    border-radius: calc(var(--size) / 2);
    background-color: gray;
    margin: var(--size);
    outline: none;
    padding: 0;
  }

  footer .dot.current {
    background-color: var(--osc-primary-color, cornflowerblue);
  }

  footer {
    background-color: transparent;
    display: flex;
    justify-content: center;
  }

  section {
    display: inline-flex;
    align-items: center;
  }

  section button {
    border: none;
    color: #8b8b8b;
    font-size: 2.5rem;
  }
</style>
