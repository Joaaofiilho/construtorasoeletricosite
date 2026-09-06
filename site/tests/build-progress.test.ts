import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, constructionState } from '../lib/build-progress.ts';

void test('scroll progress clamps overscroll and follows native document range', () => {
  assert.equal(scrollProgress(-10, 3000, 1000), 0);
  assert.equal(scrollProgress(1000, 3000, 1000), 0.5);
  assert.equal(scrollProgress(3000, 3000, 1000), 1);
});
void test('short pages and reaching contact produce a complete house', () => {
  assert.equal(scrollProgress(0, 800, 1000), 1);
  assert.equal(scrollProgress(1800, 4000, 1000, 1800), 1);
});
void test('construction reveals five phases in sequence and reverses with scrolling', () => {
  assert.deepEqual(constructionState(0).phases, [0, 0, 0, 0, 0]);
  assert.deepEqual(constructionState(0.5).phases, [1, 1, 0.5, 0, 0]);
  assert.deepEqual(constructionState(1).phases, [1, 1, 1, 1, 1]);
  assert.equal(constructionState(1).stage, 4);
  assert.deepEqual(constructionState(0).phases, [0, 0, 0, 0, 0]);
});
void test('invalid progress cannot produce invalid geometry transforms', () => {
  assert.deepEqual(constructionState(NaN).phases, [0, 0, 0, 0, 0]);
  assert.deepEqual(constructionState(-1).phases, [0, 0, 0, 0, 0]);
  assert.deepEqual(constructionState(2).phases, [1, 1, 1, 1, 1]);
});
