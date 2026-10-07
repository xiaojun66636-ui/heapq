export type Compare<T> = (left: T, right: T) => number;

/**
 * Binary heap. Default order is a min-heap of numbers.
 * `push` and `pop` are O(log n). `peek` is O(1).
 */
export class Heap<T> {
  private readonly items: T[] = [];
  private readonly compare: Compare<T>;

  constructor(compare?: Compare<T>) {
    this.compare = compare ?? ((left, right) => (left as number) - (right as number));
  }

  get size(): number {
    return this.items.length;
  }

  peek(): T | undefined {
    return this.items[0];
  }

  push(value: T): void {
    this.items.push(value);
    this.siftUp(this.items.length - 1);
  }

  pop(): T {
    if (this.items.length === 0) throw new Error("heap is empty");
    const top = this.items[0] as T;
    const last = this.items.pop() as T;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  static from<T>(values: readonly T[], compare?: Compare<T>): Heap<T> {
    const heap = new Heap(compare);
    for (const value of values) heap.push(value);
    return heap;
  }

  private siftUp(index: number) {
    const items = this.items;
    const value = items[index] as T;
    while (index > 0) {
      const parent = (index - 1) >> 1;
      const parentValue = items[parent] as T;
      if (this.compare(value, parentValue) >= 0) break;
      items[index] = parentValue;
      index = parent;
    }
    items[index] = value;
  }

  private siftDown(index: number) {
    const items = this.items;
    const value = items[index] as T;
    const length = items.length;
    while (true) {
      const left = index * 2 + 1;
      if (left >= length) break;
      const right = left + 1;
      let child = left;
      if (right < length && this.compare(items[right] as T, items[left] as T) < 0) {
        child = right;
      }
      if (this.compare(items[child] as T, value) >= 0) break;
      items[index] = items[child] as T;
      index = child;
    }
    items[index] = value;
  }
}
