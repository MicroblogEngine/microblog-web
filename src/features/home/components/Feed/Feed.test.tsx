import '@testing-library/jest-dom'
import { it, expect } from 'vitest';
import { render, renderHook } from '@testing-library/react';

import Feed from '.';
import { useFeedStore } from '@/reducers/feed';

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