<script>
  import get from 'lodash-es/get';
  import {crossfade} from 'svelte/transition';
  import {flip} from 'svelte/animate';
  import Labeled from './Labeled.svelte';
  import {globalStore, update} from './stores';

  // Set items or path.
  export let items = [];
  export let label = undefined;
  export let path = undefined; // to an array of strings
  export let store = globalStore;
  export let vertical;

  let container;
  let dragContainer;
  let dragItem;
  let offsetX;
  let offsetY;
  let overItem;
  let overPercent;

  const [send, receive] = crossfade({});

  $: if (path) items = get($store, path);

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

    const {clientX} = event;
    const children = Array.from(container.children);
    const newOverItem = children.find(child => {
      const {width, x} = child.getBoundingClientRect();
      const isOver = x <= clientX && clientX <= x + width;
      if (isOver) overPercent = (clientX - x) / width;
      return isOver;
    });

    if (newOverItem) {
      if (newOverItem !== overItem) {
        if (overItem) overItem.classList.remove('over');
        newOverItem.classList.add('over');
        overItem = newOverItem;
      }

      const onLeftSide = overPercent < 0.5;
      overItem.classList.add(onLeftSide ? 'left' : 'right');
      overItem.classList.remove(onLeftSide ? 'right' : 'left');
    }

    dragContainer.style.left = event.x - offsetX + 'px';
    dragContainer.style.top = event.y - offsetY + 'px';
  }

  function mouseUp(event) {
    // Find child before the drop location.
    const children = Array.from(container.children);
    const index = children.findIndex(child => child === overItem);
    const isLeft = overItem.classList.contains('left');

    // Insert the item being dragged back into items.
    if (index === -1) {
      items.push(dragItem);
    } else {
      items.splice(isLeft ? index : index + 1, 0, dragItem);
    }
    items = items; // trigger reactivity
    if (path) update(store, path, items);

    dragContainer.style.visibility = 'hidden';
    dragItem = null;

    overItem.classList.remove('left');
    overItem.classList.remove('right');
    overItem = null;
  }
</script>

<Labeled {label} {vertical}>
  <div bind:this={container} class="container">
    {#each items as item (item)}
      <div
        animate:flip={{duration: 500}}
        class="item"
        in:receive={{key: item}}
        out:send={{key: item}}
        on:mousedown={mouseDown}>
        <div class="inner">{item}</div>
      </div>
    {/each}
  </div>

  <div bind:this={dragContainer} class="drag-container">
    <div class="inner" on:mousemove={mouseMove} on:mouseup={mouseUp}>
      {dragItem}
    </div>
  </div>
</Labeled>

<style>
  .container {
    --space: 0.5rem;
    --target-color: lightgray;

    border: solid var(--osc-primary-color, cornflowerblue) 1px;
    display: flex;
    padding: 0 calc(var(--space) / 2);
  }

  .drag-container {
    position: absolute;
    visibility: hidden;
  }

  .drag-container > .inner {
    background-color: #ffa500c0; /* orange with opacity */
    cursor: move;
  }

  .inner {
    background-color: var(--osc-primary-color, cornflowerblue);
    color: white;
    margin: var(--space) calc(var(--space) / 2);
    padding: 0.5rem;
  }

  .item {
    display: inline-block;
    border-left: solid 1px white;
    border-right: solid 1px white;
    cursor: move;
  }

  .container > :global(.over.left) {
    border-left-color: var(--target-color);
  }

  .container > :global(.over.right) {
    border-right-color: var(--target-color);
  }
</style>
