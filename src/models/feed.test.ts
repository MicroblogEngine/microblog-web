import { it, expect } from 'vitest';
import { Post } from './feed';

it('should create a valid post object', () => {
  const post: Post = {
    id: 1,
    text: 'Hello world'
  };

  expect(post.id).toBe(1);
  expect(post.text).toBe('Hello world');
});

it('should enforce required properties', () => {
  // @ts-expect-error - Testing missing required properties
  const invalidPost: Post = {
    text: 'Missing ID'
  };

  // @ts-expect-error - Testing missing required properties
  const invalidPost2: Post = {
    id: 1
  };

  // This is just to avoid unused variable warnings
  expect(invalidPost).toBeDefined();
  expect(invalidPost2).toBeDefined();
});
