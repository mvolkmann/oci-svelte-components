<script context="module">
  import {stringsToSentence} from './util';

  export function toggleDrawer(id, index) {
    const drawerElements = document.querySelectorAll(`#${id} > .drawer`);
    const drawers = Array.from(drawerElements);
    const selectedDrawer = drawers[index];

    let openDrawer;

    for (const drawer of drawers) {
      const isOpen = drawer.classList.contains('open');

      let degrees = 0;

      // If this is the drawer being toggled and it is not currently open,
      // we need to remember to open it.
      if (drawer === selectedDrawer && !isOpen) {
        openDrawer = drawer;
        degrees = 90;
      }

      const icon = drawer.querySelector('.osc-icon');
      icon.style.transform = `rotate(${degrees}deg)`;

      if (isOpen) {
        // If the drawer being closed contains an invalid form, display a toast.
        const invalidForm = drawer.querySelector('form:invalid');
        if (invalidForm) {
          const title = drawer.querySelector('.title');
          const titleText = title ? title.textContent : 'unknown';

          let message = `Missing or invalid fields in "${titleText}":\n`;
          const invalids = drawer.querySelectorAll('.invalid > .label');
          let labels = Array.from(invalids).map(invalid => invalid.textContent);

          // Remove trailing * characters.
          labels = labels.map(label => label.replace(/\*$/, ''));
          message += stringsToSentence(labels);

          const setErrorMessage = fnMap[id];
          setErrorMessage(message);
        }

        drawer.classList.remove('open');
      }
    }

    if (openDrawer) openDrawer.classList.add('open');
  }
</script>

<script>
  import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
  import Icon from './Icon.svelte';
  import Toast from './Toast.svelte';
  import {getId} from './util';

  export let className = '';
  export let components;
  export let horizontal = false;
  export let id = getId('accordion-');
  export let props;
  export let titles;

  const classes =
    'osc-accordion' +
    (className ? ' ' + className : '') +
    (horizontal ? ' horizontal' : '');
  const fnMap = {};
  let errorMessage = '';

  fnMap[id] = msg => (errorMessage = msg);
</script>

<div class={classes} {id}>
  {#each titles as title, index}
    <div class="drawer" key={title}>
      <button on:click={() => toggleDrawer(id, index)} type="button">
        <div class="title">{title}</div>
        <Icon icon={faChevronCircleRight} />
      </button>
      <div class="content">
        <svelte:component this={components[index]} {...props[index]} />
      </div>
    </div>
  {/each}
  {#if errorMessage}
    <Toast
      backgroundColor="var(--osc-error-color)"
      on:close={() => (errorMessage = '')}
      message={errorMessage} />
  {/if}
</div>

<style>
  .drawer > button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--osc-primary-color);
    border: none;
    border-radius: 0;
    color: white;
    margin: 0.5rem 0 0 0;
    outline: none;
    padding: 1rem;
    width: 100%;
  }

  .drawer .title {
    font-size: 1.2rem;
  }

  .drawer > .content {
    border-bottom: solid lightgray 1px;
    border-left: solid lightgray 1px;
    border-right: solid lightgray 1px;
    max-height: 0;
    overflow-y: auto;
    padding: 0 0.5rem;
    transition-duration: var(--osc-transition-duration, 0.5s);
  }

  /* Must use :global here because the "open" class
     is added via DOM manipulation.
     Otherwise Svelte will think this selector is not used. */
  :global(.drawer.open) .content {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    max-height: 100vh;
  }

  :global(.osc-icon) {
    transition-duration: var(--osc-transition-duration, 0.5s);
    transition-property: transform;
  }

  .horizontal {
    position: relative;
  }

  .horizontal .drawer {
    --drawer-width: 300px;
    width: var(--drawer-width);
  }

  .horizontal .drawer > button {
    border-bottom: solid var(--osc-secondary-color) 1px;
    color: white;
    margin-bottom: 0;
    margin-top: 0;
  }

  .horizontal .drawer > .content {
    position: absolute;
    left: calc(var(--drawer-width) + 1rem);
    top: 0;

    margin-top: 0;
    transition-duration: unset;
  }

  /*
  .horizontal :global(.open) .content {
    border: solid var(--osc-primary-color) 2px;
    padding: 2rem;
  }

  .horizontal :global(.open) .osc-icon {
    transform: none;
  }
  */

  .osc-accordion {
    display: inline-block;
    margin-bottom: 1rem;
  }

  @media (max-width: 760px) {
    .drawer .title {
      font-size: 1rem;
    }
  }
</style>
