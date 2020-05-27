<script>
  import Spinner from '../src/Spinner.svelte';
  import Table from '../src/Table.svelte';
  import TransactionDetail from '../src/TransactionDetail.svelte';

  const defaultFilters = {
    category: {
      operator1: 'equals',
      value1: 'clothing'
    }
  };

  const headings = [
    {
      property: 'date',
      title: 'Date',
      type: 'date',
      canFilter: true
    },
    {
      property: 'category',
      title: 'Category',
      canFilter: true
    },
    {
      property: 'price',
      title: 'Price',
      type: 'currency',
      canFilter: true
    },
    {
      property: 'description',
      title: 'Description',
      canFilter: true,
      optional: true
    },
    {property: 'txnId', title: 'Transaction ID', optional: true}
  ];

  const URL = 'http://localhost:4001/transactions';

  const style = {
    '--osc-primary-color': '#156F2D',
    '--osc-secondary-color': '#D38848'
  };

  const headingTooltip =
    '**Date**: The date of the transaction\n' +
    '**Category**: The category of transaction.\n' +
    '**Price**: The dollar amount of the transaction.\n' +
    '**Description**: A description of the transaction.';
  '**Transaction ID**: An ID for the transaction.';
</script>

<Table
  breakpoint={600}
  dataUrl={URL}
  {defaultFilters}
  detailComponent={TransactionDetail}
  {headings}
  {headingTooltip}
  sortAll
  {style} />

<Spinner />
