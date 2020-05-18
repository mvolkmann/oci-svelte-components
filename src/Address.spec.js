import {cleanup, render} from '@testing-library/svelte';

import Address from './Address.svelte';

describe('Address', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const path = 'user.profile.address';
    const {container} = render(Address, {path});
    expect(container).toMatchSnapshot();
  });
});
