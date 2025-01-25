import { describe,it, expect, beforeAll, afterAll } from 'vitest';
import { render } from '@testing-library/react';

import FeedList from '.';

describe('FeedList', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 50 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight!);
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth!);
  });

  it('should render the feed list', () => {
    const { getByText } = render(<FeedList feed={[{ id: 1, text: 'Feed Item' }]} />);
    expect(getByText('Feed Item')).toBeInTheDocument();
  });
  
  it('should render the feed list with no posts', () => {
    const { getByTestId } = render(<FeedList feed={[]} />);
    const message = getByTestId('message');
    expect(message.textContent).toBe('No posts to show');
  });
});
