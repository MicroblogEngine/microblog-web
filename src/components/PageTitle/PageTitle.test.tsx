import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import PageTitle from './PageTitle';

it('should render the page title', () => {
  const { getByText } = render(<PageTitle text="Home" />);
  expect(getByText('Home')).toBeInTheDocument();
});