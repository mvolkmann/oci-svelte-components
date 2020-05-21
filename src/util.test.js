import {indexOfNth, kebabCase, stringsToSentence} from './util';

test('indexOfNth normal', () => {
  const text = '/foo/bar/baz/';
  expect(indexOfNth(text, '/', 1)).toBe(0);
  expect(indexOfNth(text, '/', 2)).toBe(4);
  expect(indexOfNth(text, '/', 3)).toBe(8);
  expect(indexOfNth(text, '/', 4)).toBe(12);
  expect(indexOfNth(text, '/', 5)).toBe(-1);
});

test('indexOfNth not found', () => {
  const text = '/foo/bar/baz/';
  expect(indexOfNth(text, '*', 1)).toBe(-1);
});

test('indexOfNth on empty', () => {
  const text = '';
  expect(indexOfNth(text, '/', 1)).toBe(-1);
});

test('indexOfNth on URL', () => {
  const url = 'http://localhost:4000/garden-view/profile';
  expect(indexOfNth(url, '/', 4)).toBe(33);
});

test('kebabCase', () => {
  expect(kebabCase('')).toBe('');
  expect(kebabCase('foo')).toBe('foo');
  expect(kebabCase('fooBar')).toBe('foo-bar');
  expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz');
});

test('stringsToSentence', () => {
  expect(stringsToSentence([])).toBe('');
  expect(stringsToSentence(['foo'])).toBe('foo');
  expect(stringsToSentence(['foo', 'bar'])).toBe('foo and bar');
  expect(stringsToSentence(['foo', 'bar', 'baz'])).toBe('foo, bar, and baz');
  expect(stringsToSentence(['foo', 'bar', 'baz', 'qux'])).toBe(
    'foo, bar, baz, and qux'
  );
});
