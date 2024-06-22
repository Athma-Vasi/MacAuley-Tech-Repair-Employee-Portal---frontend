class ListNode<T extends unknown = unknown> {
  constructor(
    public value: T | null,
    public next: ListNode<T> | null = null,
    public previous: ListNode<T> | null = null
  ) {}
}

class LinkedListDouble<T extends unknown = unknown> {
  head: ListNode<T> = new ListNode<T>(null);
  tail: ListNode<T> = new ListNode<T>(null);

  #length = 0;

  constructor(public data: T[] = []) {
    this.head.next = this.tail;
    this.tail.previous = this.head;

    this.data.forEach((data) => this.insert(data));
    this.#length = this.data.length;
  }

  get size(): number {
    return this.#length;
  }
  get first(): T | null {
    return this.head.next?.value ?? null;
  }
  get last(): T | null {
    return this.tail.previous?.value ?? null;
  }
  get isEmpty(): boolean {
    return this.#length === 0;
  }

  *iterator() {
    let currentNode = this.head.next;
    while (currentNode !== this.tail) {
      if (currentNode) {
        yield currentNode.value;
        currentNode = currentNode.next;
      }
    }
  }
  [Symbol.iterator] = this.iterator;

  deleteAtIndex(index: number) {
    if (index < 0 || index >= this.#length) {
      return;
    }

    let currentNode = this.head.next;
    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    if (currentNode) {
      const previous = currentNode.previous;
      const next = currentNode.next;

      if (previous) {
        previous.next = next;
      }

      if (next) {
        next.previous = previous;
      }

      this.#length -= 1;
    }
  }

  elementAt(index: number): T | null {
    if (index < 0 || index >= this.#length) {
      return null;
    }

    let currentNode = this.head.next;

    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    return currentNode?.value ?? null;
  }

  find(comparator: (value: T | null) => boolean): T | null {
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode && comparator(currentNode.value)) {
        return currentNode.value;
      }

      if (currentNode) {
        currentNode = currentNode.next;
      }
    }

    return null;
  }

  indexOf(value: T): number {
    let currentNode = this.head.next;
    let index = 0;

    while (currentNode !== this.tail) {
      if (currentNode?.value === value) {
        return index;
      }

      if (currentNode) {
        currentNode = currentNode.next;
        index += 1;
      }
    }

    return -1;
  }

  insert(value: T): void {
    const newNode = new ListNode<T>(value);
    const lastNode = this.tail.previous;

    if (lastNode) {
      lastNode.next = newNode;
    }

    newNode.previous = lastNode;
    newNode.next = this.tail;
    this.tail.previous = newNode;
  }

  insertAtHead(value: T) {
    const previous = this.head;
    const next = this.head.next;
    const newNode = new ListNode<T>(value, next, previous);
    previous.next = newNode;

    if (next) {
      next.previous = newNode;
    }

    this.#length += 1;
  }

  insertAtTail(value: T) {
    const previous = this.tail.previous;
    const next = this.tail;
    const newNode = new ListNode<T>(value, next, previous);

    if (previous) {
      previous.next = newNode;
    }

    next.previous = newNode;
    this.#length += 1;
  }

  insertAtIndex(index: number, value: T) {
    if (index < 0 || index > this.#length) {
      return;
    }

    let currentNode = this.head.next;
    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    if (currentNode) {
      const previous = currentNode.previous;
      const next = currentNode;
      const newNode = new ListNode<T>(value, next, previous);

      if (previous) {
        previous.next = newNode;
      }

      next.previous = newNode;
      this.#length += 1;
    }
  }

  removeAtIndex(index: number) {
    if (index < 0 || index >= this.#length) {
      return;
    }

    let currentNode = this.head.next;
    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    if (currentNode) {
      const previous = currentNode.previous;
      const next = currentNode.next;

      if (previous) {
        previous.next = next;
      }

      if (next) {
        next.previous = previous;
      }

      this.#length -= 1;
    }
  }

  swapWithPrevious(index: number) {
    if (index <= 0 || index >= this.#length) {
      return;
    }

    let currentNode = this.head.next;
    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    if (currentNode) {
      const previous = currentNode.previous;
      const next = currentNode.next;

      if (previous) {
        previous.next = next;
      }

      if (next) {
        next.previous = previous;
      }

      if (previous) {
        const previousPrevious = previous.previous;
        previous.next = next;
        previous.previous = currentNode;
        currentNode.next = previous;
        currentNode.previous = previousPrevious;

        if (previousPrevious) {
          previousPrevious.next = currentNode;
        }
      }
    }
  }

  swapWithNext(index: number) {
    if (index < 0 || index >= this.#length - 1) {
      return;
    }

    let currentNode = this.head.next;
    Array.from({ length: index }).forEach(() => {
      if (currentNode) {
        currentNode = currentNode.next;
      }
    });

    if (currentNode) {
      const previous = currentNode.previous;
      const next = currentNode.next;

      if (previous) {
        previous.next = next;
      }

      if (next) {
        next.previous = previous;
      }

      if (next) {
        const nextNext = next.next;
        next.next = currentNode;
        next.previous = previous;
        currentNode.next = nextNext;
        currentNode.previous = next;

        if (nextNext) {
          nextNext.previous = currentNode;
        }
      }
    }
  }

  toArray(): (T | null)[] {
    return Array.from(this);
  }

  traverse(): void {
    let currentNode = this.head.next;
    while (currentNode !== this.tail) {
      if (currentNode) {
        console.log(currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }
}

export { LinkedListDouble };
