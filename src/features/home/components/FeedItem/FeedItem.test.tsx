import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import FeedItem from '.';

it('should render the feed item', () => {
  const { getByText } = render(<FeedItem post={{ id: 1, text: 'Feed Item' }} />);
  expect(getByText('Feed Item')).toBeInTheDocument();
});