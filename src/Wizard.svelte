<script>
  export let className = undefined;
  export let completeLabel = 'Complete';
  export let nextLabel = 'Next';
  export let onComplete;
  export let previousLabel = 'Previous';

  // This is an array of objects that have
  // title, component, and props properties.
  export let steps;

  const classes = 'wizard' + (className ? ' ' + className : '');

  let stepIndex = 0;

  $: step = steps[stepIndex];
  $: onFirstStep = stepIndex === 0;
  $: onLastStep = stepIndex + 1 === steps.length;
</script>

<div class={classes}>
  <div class="wrapper">
    {#if step.description}
      <div class="step-description">{step.description}</div>
    {/if}
    <div class="steps">
      {#each steps as step, index}
        <button
          class={'step' + (index === stepIndex ? ' current' : '')}
          key={step.title}
          on:click={() => (stepIndex = index)}>
          <div class="step-number">{index + 1}</div>
          <div class="step-title">{step.title}</div>
        </button>
      {/each}
    </div>
    <div class="step-content">
      <svelte:component this={step.component} {...step.props} />
      <div class="buttons">
        {#if !onFirstStep}
          <button class="next-prev-btn" on:click={() => stepIndex--}>
            {previousLabel}
          </button>
        {/if}
        {#if !onLastStep}
          <button class="next-prev-btn" on:click={() => stepIndex++}>
            {nextLabel}
          </button>
        {/if}
        {#if onLastStep}
          <button class="complete-btn" on:click={onComplete}>
            {completeLabel}
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .wizard {
    --inactive-bg: #c8c8c8;
    --inactive-fg: #363636;
  }

  .form {
    display: flex;
  }

  .form label {
    margin-right: 0;
  }

  .form .left,
  .form .right {
    flex-grow: 1;
  }

  .form .left {
    padding-right: 3rem;
  }

  .form .right {
    padding-left: 3rem;
  }

  .form .right:not(:empty) {
    border-left: solid var(--inactive-bg) 1px;
  }

  h1 {
    font-size: 2rem;
    font-weight: normal;
    margin-bottom: 0.5rem;
  }

  input {
    border-radius: 0;
    box-sizing: border-box;
  }

  .step-description {
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: transparent;
    border: none;
    outline: none;
  }

  .step-number {
    --size: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--inactive-bg);
    border-radius: calc(var(--size) / 2);
    color: var(--inactive-fg);
    font-size: 1.5rem;
    font-weight: bold;
    height: var(--size);
    width: var(--size);
  }

  .step-title {
    color: #363636;
    font-size: 1rem;
    font-weight: 300;
  }

  .step.current .step-number {
    background-color: var(--osc-primary-color, cornflowerblue);
    color: white;
  }

  .step.current .step-title {
    color: var(--osc-primary-color, cornflowerblue);
    margin-top: 0.5rem;
  }

  .step-content {
    margin: 2rem 0;
    text-align: center;
  }

  .step-content button {
    background-color: var(--osc-primary-color, cornflowerblue);
    border-radius: 6px;
    color: white;
    font-size: 1.2rem;
    margin-right: 2rem;
    margin-top: 2rem;
    padding: 0.5rem 2rem;
    text-transform: uppercase;
  }

  .step-content .buttons {
    display: flex;
    justify-content: center;
  }

  .steps {
    display: flex;
    justify-content: space-around;

    background-color: transparent;
    border-bottom: solid var(--inactive-bg) 1px;
    border-top: solid var(--inactive-bg) 1px;
    padding: 0.5rem 0;
  }

  /*
  @media (max-width: 760px) {
    .form {
      flex-direction: column;

      .left {
        padding-right: 0;
      }

      .right {
        padding-left: 0;
        padding-top: 1.5rem;

        &:not(:empty) {
          border-left: none;
          border-top: solid var(--inactive-bg) 1px;
          margin-top: 2rem;
        }
      }
    }

    .next-prev-btn {
      width: 100%;
    }

    .nav {
      .step {
        .step-number {
          --size: 2.5rem;
          font-size: 1.2rem;
        }

        .step-title {
          font-size: 1.4rem;
        }
      }
    }

    .step-content {
      margin: 3rem;

      button {
        margin-right: 0;
      }
    }
  */
</style>
