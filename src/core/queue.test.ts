import { Queue } from './queue';

describe('Queue', () => {
  it('enqueues and dequeues items correctly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    expect(queue.peek()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.isEmpty()).toBe(true);
  });
});
