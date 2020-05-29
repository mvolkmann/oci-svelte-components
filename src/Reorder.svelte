<script>
  export let items;

  let dragElement;
  let parentRef;

  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function dragStart(event) {
    dragElement = event.target;
    //const text = event.target.textContent;
    //event.dataTransfer.setData('text/plain', text);
    event.dataTransfer.dropEffect = 'move';
  }

  function drop(event) {
    event.preventDefault();
    const {clientX} = event;

    // Find child before the drop location.
    const children = parentRef.children;
    const nextSibling = Array.from(children).find(
      child => clientX < child.getBoundingClientRect().x
    );

    parentRef.insertBefore(dragElement, nextSibling);
  }
</script>

<div
  bind:this={parentRef}
  class="osc-reorder"
  on:dragover={dragOver}
  on:drop={drop}>
  {#each items as item}
    <!-- Must set draggable to true, not just have the attribute! -->
    <div class="item" draggable="true" on:dragstart={dragStart}>{item}</div>
  {/each}
</div>

<style>
  .item {
    display: inline-block;
    border: solid blue 3px;
    cursor: move;
    margin-right: 1rem;
    padding: 1rem;
  }

  .osc-reorder {
    border: solid red 2px;
    padding: 1rem;
  }
</style>
