export class Queue<T> {
  static EMPTY_ERROR = 'Queue is empty';

  private _items: T[] = [];
  public get items(): T[] {
    return this._items;
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T {
    if (this.isEmpty()) throw Error(Queue.EMPTY_ERROR);
    return this.items.shift() as T;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
