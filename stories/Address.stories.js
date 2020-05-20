import Address from '../src/Address.svelte';

export default {title: 'Address'};

export const Basic = () => ({
  Component: Address,
  props: {path: 'user.profile.address'}
});
