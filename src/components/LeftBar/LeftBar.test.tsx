import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import LeftBar from '.';

it('should render the left bar', () => {
  const { getByText } = render(<LeftBar />);
  expect(getByText('Microblog')).toBeInTheDocument();
});