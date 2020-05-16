import {cleanup, render} from '@testing-library/svelte';

import Button from './Button.svelte';

describe('Button', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const label = 'Press Me';
    const {container} = render(Button, {label});
    expect(container).toMatchSnapshot();
  });
});