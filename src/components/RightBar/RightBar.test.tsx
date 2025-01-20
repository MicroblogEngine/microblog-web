import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import RightBar from '.';

it('should render the right bar', () => {
  const { getByText } = render(<RightBar />);
  expect(getByText('More About')).toBeInTheDocument();
});