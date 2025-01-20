import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import FeedList from '.';

it('should render the feed list', () => {
  const { getByText } = render(<FeedList feed={[{ id: 1, text: 'Feed Item' }]} />);
  expect(getByText('Feed Item')).toBeInTheDocument();
});

it('should render the feed list with no posts', () => {
  const { getByText } = render(<FeedList feed={[]} />);
  expect(getByText('No posts to show')).toBeInTheDocument();
});