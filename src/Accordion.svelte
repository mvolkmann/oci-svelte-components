<script context="module">
  import {stringsToSentence} from './util';

  export function toggleDrawer(id, index) {
    const drawerElements = document.querySelectorAll(`#${id} > .drawer`);

    let openDrawer;

    // Close all the drawers.
    Array.from(drawerElements).forEach((drawer, i) => {
      let isOpen = drawer.classList.contains('open');

      // If this is the drawer being toggled and it is not currently open,
      // we need to remember to open it.
      if (i === index && !isOpen) openDrawer = drawer;

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
      }

      drawer.classList.remove('open');
    });

    if (openDrawer) openDrawer.classList.add('open');
  }
</script>

<script>
  import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
  import Icon from './Icon.svelte';
  import Toast from './Toast.svelte';
  import {getId} from './util';

  export let children;
  export let className = '';
  export let horizontal = false;
  export let id = getId('accordion-');
  export let titles;

  const classes =
    'osc-accordion' +
    (className ? ' ' + className : '') +
    (horizontal ? ' horizontal' : '');
  const fnMap = {};
  let errorMessage = '';

  fnMap[id] = msg => (errorMessage = msg);
</script>

<div className={classes} {id}>
  {#each titles as title, index}
    <div className="drawer" key={title}>
      <button on:click={() => toggleDrawer(id, index)} type="button">
        <div className="title">{title}</div>
        <Icon icon={faChevronCircleRight} />
      </button>
      <div className={`content content${index}`}>children[index]</div>
    </div>
  {/each}
  {#if errorMessage}
    <Toast
      backgroundColor="var(--error-color)"
      on:close={() => (errorMessage = '')}
      message={errorMessage} />
  {/if}
</div>

<style>
  .accordion {
    --transition-duration: 0.5s;
  }

  .drawer > button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--light-gray, lightgray);
    border: none;
    border-radius: 0;
    color: black;
    margin-top: 0.5rem;
    outline: none;
    padding: 1rem;
    width: 100%;
  }

  .drawer > button > .icon {
    background-color: transparent;
    border: none;
    outline: none;
    transition-duration: var(--transition-duration);
    transition-property: transform;
    transform: rotate(0deg);
  }

  .drawer > button > .icon svg {
    color: var(--secondary-color);
  }

  .drawer .title {
    font-size: 1.2rem;
  }

  .drawer > .content {
    max-height: 0;
    overflow-y: auto;
    transition-duration: var(--transition-duration);
    transition-property: height, max-height;
  }

  .drawer.open > button {
    background-color: var(--secondary-color);
    color: white;
  }

  .drawer.open > button > .icon {
    transform: rotate(90deg);
  }

  .drawer.open > button > .icon svg {
    color: white;
  }

  .drawer.open .content {
    border-bottom: solid lightgray 1px;
    border-left: solid lightgray 1px;
    border-right: solid lightgray 1px;
    padding: 0.5rem;

    /* Transition of height does not work when set to "auto". */
    /*max-height: 50px;*/

    max-height: 100vh;
  }

  .accordion.horizontal {
    position: relative;
  }

  .accordion.horizontal .drawer {
    --drawer-width: 300px;
    width: var(--drawer-width);
  }

  .accordion.horizontal .drawer > button {
    border-bottom: solid var(--secondary-color) 1px;
    color: white;
    margin-bottom: 0;
    margin-top: 0;
  }

  .accordion.horizontal .drawer > .content {
    position: absolute;
    left: calc(var(--drawer-width) + 1rem);
    top: 0;

    margin-top: 0;
    transition-duration: unset;
  }

  .accordion.horizontal .drawer.open .content {
    border: solid var(--primary-color) 2px;
    padding: 2rem;
  }

  .accordion.horizontal .drawer.open .icon {
    transform: none;
  }

  @media (max-width: 760px) {
    .drawer > button .title {
      font-size: 1rem;
    }
  }
</style>
