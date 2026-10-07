# heapq

Binary heap. No dependencies.

The default order is a numeric min-heap: the smallest value is at `peek`. Pass a compare function for anything else, including a max-heap (`(a, b) => b - a`). A negative result means the left value comes out first.

`push` and `pop` sift one path, so both are O(log n). `peek` is O(1). `Heap.from` pushes one value at a time, which is O(n log n), not the linear heapify.

## Use

```ts
import { Heap } from "./src/heap.ts";

const heap = Heap.from([4, 1, 3]);
heap.pop(); // 1
heap.push(0);
heap.peek(); // 0
```

`pop` on an empty heap throws.

## Test

```bash
node --experimental-strip-types --test test/*.test.ts
```

## License

MIT
