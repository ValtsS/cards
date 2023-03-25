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

  test('should throw an error on dequeue if the queue is empty', () => {
    const queue = new Queue<number>();

    expect(() => queue.dequeue()).toThrow(Error);
    expect(() => queue.dequeue()).toThrow(Queue.EMPTY_ERROR);
  });

  test('should throw an error on peek if the queue is empty', () => {
    const queue = new Queue<number>();

    expect(() => queue.peek()).toThrow(Error);
    expect(() => queue.peek()).toThrow(Queue.EMPTY_ERROR);
  });

  test('should remove and return the first item in the queue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);

    const item = queue.dequeue();

    expect(item).toBe(1);
    expect(queue.size()).toBe(1);
  });
});
