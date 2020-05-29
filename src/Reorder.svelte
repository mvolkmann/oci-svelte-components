<script>
  import {quintOut} from 'svelte/easing';
  import {crossfade} from 'svelte/transition';
  import {flip} from 'svelte/animate';

  export let items;

  let container;
  let dragContainer;
  let dragItem;
  let offsetX;
  let offsetY;

  const [send, receive] = crossfade({});

  function mouseDown(event) {
    const dragElement = event.target;
    dragItem = dragElement.textContent.trim();
    items = items.filter(item => item !== dragItem);

    const rect = dragElement.getBoundingClientRect();
    offsetX = event.x - rect.x;
    offsetX = event.y - rect.y;

    dragContainer.firstChild.textContent = dragItem;
    dragContainer.style.left = rect.x + 'px';
    dragContainer.style.top = rect.y + 'px';
    dragContainer.style.visibility = 'visible';
  }

  function mouseMove(event) {
    if (!dragItem) return;

    dragContainer.style.left = event.x - offsetX + 'px';
    dragContainer.style.top = event.y - offsetY + 'px';
  }

  function mouseUp(event) {
    // Find child before the drop location.
    const {clientX} = event;
    const index = Array.from(container.children).findIndex(
      child => clientX < child.getBoundingClientRect().x
    );

    // Insert the item being dragged back into items.
    if (index === -1) {
      items.push(dragItem);
    } else {
      items.splice(index, 0, dragItem);
    }
    items = items; // trigger reactivity

    dragContainer.style.visibility = 'hidden';
    dragItem = null;
  }
</script>

<div class="osc-reorder">
  <div bind:this={container} class="container">
    {#each items as item (item)}
      <div
        animate:flip={{duration: 500}}
        class="item"
        in:receive={{key: item}}
        out:send={{key: item}}
        on:mousedown={mouseDown}>
        {item}
      </div>
    {/each}
  </div>

  <div bind:this={dragContainer} class="drag-container">
    <div class="item" on:mousemove={mouseMove} on:mouseup={mouseUp}>
      {dragItem}
    </div>
  </div>
</div>

<style>
  .container {
    border: solid red 2px;
    display: flex;
    padding: 1rem;
  }

  .drag-container {
    position: absolute;
    visibility: hidden;
  }

  .item {
    display: inline-block;
    background-color: #cccccce0;
    border: solid blue 3px;
    cursor: move;
    margin-right: 1rem;
    padding: 1rem;
  }
</style>
