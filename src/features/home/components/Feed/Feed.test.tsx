import '@testing-library/jest-dom'
import { describe,it, expect, beforeAll, afterAll } from 'vitest';
import { render, renderHook } from '@testing-library/react';

import Feed from '.';
import { useFeedStore } from '@/reducers/feed';

describe('Feed', () => {
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

  it('should return the initial state', () => {
    const { result } = renderHook(() => useFeedStore());
    expect(result.current.feed).toEqual([]);
  });

  it('check if it is loading', async () => {
    const { result } = renderHook(() => useFeedStore());
    result.current.loading = true;
    const { getByTestId } = render(<Feed />);
    const node = getByTestId('loading');
    expect(node).toHaveTextContent('Loading...');
  });

  it('check if it is not loading', async () => {
    const { result } = renderHook(() => useFeedStore());
    result.current.loading = false;
    const { queryByTestId } = render(<Feed />);
    const node = queryByTestId('loading');
    expect(node).toBeNull();
  });

  it('check if it is not loading and has empty feed', async () => {
    const { result } = renderHook(() => useFeedStore());
    result.current.loading = false;
    const { queryByTestId } = render(<Feed />);
    const node = queryByTestId('message');
    expect(node).toHaveTextContent('No posts to show');
  });

  it('check if it is not loading and has feed', async () => {
    const { result } = renderHook(() => useFeedStore());
    result.current.feed = [
      { id: 1, text: 'Hello' }
    ];
    const { queryByTestId } = render(<Feed />);
    const node = queryByTestId('post_text');
    expect(node).toHaveTextContent('Hello');
  });
});