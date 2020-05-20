<script context="module">
  import {stringsToSentence} from './util';

  // This is in the module context so it can be imported
  // and called from outside this component.
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
  import {onMount} from 'svelte';
  import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
  import Icon from './Icon.svelte';
  import Toast from './Toast.svelte';
  import {getId} from './util';

  export let className = '';
  export let data;
  export let drawerWidth = '200px';
  export let horizontal = false;
  export let id = getId('accordion-');

  const classes =
    'osc-accordion' +
    (className ? ' ' + className : '') +
    (horizontal ? ' horizontal' : '');
  const fnMap = {};

  let errorMessage = '';
  let ref;

  fnMap[id] = msg => (errorMessage = msg);

  onMount(() => ref.style.setProperty('--drawer-width', drawerWidth));
</script>

<div bind:this={ref} class={classes} {id}>
  {#each data as {component, props, title}, index}
    <div class="drawer" key={title}>
      <button on:click={() => toggleDrawer(id, index)} type="button">
        <div class="title">{title}</div>
        <Icon color="white" icon={faChevronCircleRight} />
      </button>
      <div class="content">
        <svelte:component this={component} {...props} />
      </div>
    </div>
  {/each}
  {#if errorMessage}
    <Toast
      backgroundColor="var(--osc-error-color, red)"
      on:close={() => (errorMessage = '')}
      message={errorMessage} />
  {/if}
</div>

<style>
  .drawer {
    width: var(--drawer-width);
  }

  .drawer > button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--osc-primary-color, cornflowerblue);
    border: none;
    border-radius: 0;
    color: white;
    margin: 0;
    outline: none;
    padding: 1rem;
    width: 100%;
  }

  .drawer:not(:first-of-type) > button {
    margin-top: 0.5rem;
  }

  .drawer .title {
    font-size: 1.2rem;
  }

  .drawer > .content {
    border-color: var(--osc-primary-color, cornflowerblue);
    border-style: solid;
    border-bottom-width: 0;
    border-top-width: 0;
    border-left-width: 2px;
    border-right-width: 2px;
    max-height: 0;
    overflow-y: auto;
    padding: 0 0.5rem;
    transition-duration: var(--osc-transition-duration, 0.5s);
  }

  /* Must use :global here because the "open" class
     is added via DOM manipulation.
     Otherwise Svelte will think this selector is not used. */
  :global(.drawer.open) .content {
    border-bottom-width: 2px;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    max-height: 100vh;
  }

  :global(.osc-icon) {
    color: white;
    font-size: 1.2rem;
    transition-duration: var(--osc-transition-duration, 0.5s);
    transition-property: transform;
  }

  .horizontal {
    position: relative;
  }

  .horizontal .drawer {
    display: flex;
  }

  .horizontal .drawer > .content {
    border: none;
    position: absolute;
    left: calc(var(--drawer-width) + 1rem);
    top: 0;

    margin-top: 0;
    transition-duration: unset;
  }

  .horizontal :global(.open .content) {
    border: solid var(--osc-primary-color, cornflowerblue) 2px;
    padding: 2rem;
  }

  .horizontal :global(.open .osc-icon) {
    color: var(--osc-secondary-color, orange) !important;
    transform: none !important;
  }

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
