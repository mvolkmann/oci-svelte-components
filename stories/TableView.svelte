<script>
  import Table from '../src/Table.svelte';
  import TransactionDetail from '../src/TransactionDetail.svelte';

  const defaultFilters = {
    category: {
      property: 'category',
      title: 'Category',
      type: 'string',
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
      canFilter: true
    },
    {property: 'txnId', title: 'Transaction ID'}
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
  {defaultFilters}
  detailComponent={TransactionDetail}
  getUrl={URL}
  {headings}
  {headingTooltip}
  sortAll
  {style} />
