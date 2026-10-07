import assert from "node:assert/strict";
import { test } from "node:test";
import { Heap } from "../src/heap.ts";

test("pop returns values in ascending order", () => {
  const heap = Heap.from([5, 1, 4, 2, 3, 2]);
  const out: number[] = [];
  while (heap.size > 0) out.push(heap.pop());
  assert.deepEqual(out, [1, 2, 2, 3, 4, 5]);
});

test("peek does not remove the top", () => {
  const heap = new Heap<number>();
  heap.push(3);
  heap.push(1);
  assert.equal(heap.peek(), 1);
  assert.equal(heap.size, 2);
  assert.equal(heap.pop(), 1);
});

test("a custom compare builds a max-heap", () => {
  const heap = new Heap<number>((left, right) => right - left);
  for (const value of [1, 4, 2]) heap.push(value);
  assert.equal(heap.pop(), 4);
  assert.equal(heap.pop(), 2);
  assert.equal(heap.pop(), 1);
});

test("matches a sorted oracle on random input", () => {
  const values = [8, 3, 9, 1, 7, 7, 0, 4, 6, 2, 5, 9];
  const heap = new Heap<number>();
  for (const value of values) heap.push(value);
  const popped: number[] = [];
  while (heap.size > 0) popped.push(heap.pop());
  assert.deepEqual(popped, values.slice().sort((left, right) => left - right));
});

test("pop on an empty heap throws", () => {
  assert.throws(() => new Heap<number>().pop(), /empty/);
});
