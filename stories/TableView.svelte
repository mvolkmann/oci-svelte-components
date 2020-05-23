<script>
  //import {globalStore} from '../src/stores';
  import Table from '../src/Table.svelte';
  //import TransactionDetail from '../transaction-detail';

  //globalStore.set({addressSelect: {vertical: false}});

  const defaultFilters = {
    activityType: {
      property: 'activityType',
      title: 'Activity Type',
      type: 'string',
      operator1: 'equals',
      value1: 'Redemption'
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
      property: 'activityType',
      title: 'Activity Type',
      canFilter: true
    },
    {
      property: 'amount',
      title: 'Amount',
      type: 'currency',
      canFilter: true
    },
    {
      property: 'pointsActivity',
      title: 'Points Activity',
      type: 'number'
    },
    {
      property: 'description',
      title: 'Description',
      canFilter: true
    },
    {property: 'redemptionId', title: 'Redemption ID'},
    {property: 'pointType', title: 'Point Type'}
  ];

  const URL = 'http://localhost:4000/transactions';

  const style = {
    '--primary-color': '#156F2D',
    '--secondary-color': '#D38848'
  };

  const headingTooltip =
    '**Date**: The date of the transaction\n' +
    '**Activity Type**: The type of transaction.\n' +
    '**Amount**: The dollar amount of the purchases.\n' +
    '**Points Activity**: The Reward Points applied or reduced from total.';
</script>

<Table
  detailComponent={TransactionDetail}
  getUrl={URL}
  {headings}
  {headingTooltip}
  sortAll
  {style} />
