<script>
  export let className = '';
  export let data;

  const classes = 'transaction-detail' + (className ? ' ' + className : '');
</script>

<div class={classes}>
  <div class="label">Description</div>
  {data.description}
  <div class="label">Transaction Id</div>
  {data.txnId}
</div>

<style>
  .transaction-detail {
    /* --osc-primary-color with "10" at end for opacity? */
    --background-color: #0e652510;

    background-color: var(--background-color);
    overflow-y: hidden;
    text-align: left;
  }

  .label {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .label:first-of-type {
    margin-top: 0;
  }
</style>
