/** @see https://www.sandromaglione.com/articles/trie-data-structure-typescript */
class Trie {
  /** check if current node marks a complete word */
  #isEnd = false;

  /** store subTrie */
  #children: Map<string, Trie> = new Map();

  public get isEnd(): boolean {
    return this.#isEnd;
  }

  public get children(): Map<string, Trie> {
    return this.#children;
  }

  /** check if given char is present in current trie */
  hasChar(char: string): Trie | undefined {
    return this.#children.get(char) ?? this.#children.get(char.toUpperCase());
  }

  /** add trie at given char, and return newly added trie */
  addChar(char: string): Trie {
    if (!this.#children.has(char)) {
      this.#children.set(char, new Trie());
    }
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return this.#children.get(char)!;
  }

  /** mark complete word found in current trie */
  makeEnd(): void {
    this.#isEnd = true;
  }

  /** search given word in trie */
  searchTrie(word: string): boolean {
    if (word.length === 0) {
      return this.#isEnd;
    }

    const subTrie = this.#children.get(word[0]);
    if (!subTrie) {
      return false;
    }

    return subTrie.searchTrie(word.slice(1));
  }

  /** add word to this trie */
  addWord(word: string): void {
    if (word.length === 0) {
      this.makeEnd();
      return;
    }

    const subTrie = this.hasChar(word[0]);
    if (subTrie !== undefined) {
      subTrie.addWord(word.slice(1));
    }
    const newSubTrie = this.addChar(word[0]);
    newSubTrie.addWord(word.slice(1));
  }

  /** autocomplete words with given prefix */
  autoComplete(prefix: string): string[] {
    const trie = this.findTrie(prefix);
    if (!trie) {
      return [];
    }

    return trie.allWords(prefix);
  }

  /** find trie with given prefix */
  private findTrie(prefix: string): Trie | undefined {
    if (prefix.length === 0) {
      return this;
    }

    const subTrie = this.hasChar(prefix[0]);
    if (!subTrie) {
      return;
    }

    return subTrie.findTrie(prefix.slice(1));
  }

  /** find all words in trie */
  private allWords(prefix: string): string[] {
    const words: string[] = [];
    if (this.#isEnd) {
      words.push(prefix);
    }

    Array.from(this.#children).forEach(([char, subTrie]) => {
      words.push(...subTrie.allWords(prefix + char));
    });

    return words;
  }

  /** static constructor to build a trie from an array of words */
  static buildTrie = (words: string[]): Trie => {
    const trie = new Trie();
    words.forEach((word) => trie.addWord(word));
    return trie;
  };
}

export { Trie };
/**
  class TrieNode<T extends string = string> {
  count: number;
  children: Map<T | null, TrieNode<T>>;
  parent: TrieNode<T> | null;

  constructor(public key: T | null = null, parent: TrieNode<T> | null = null) {
    this.key = key;
    this.count = 0;
    this.children = new Map();
    this.parent = parent;
  }
}

class Trie<T extends string = string> {
  root: TrieNode<T> | undefined;

  constructor(public data: T[] = []) {
    data.forEach((word) => this.insert(word));
    // create only root with null key and parent
    this.root = new TrieNode<T>();
  }

  // recursively finds the occurrence of all words in a given trienode
  static findAllWords(
    root: TrieNode | null,
    word: string,
    output: Array<{ word: string; count: number }>
  ) {
    if (root === null) {
      return;
    }
    if (root.count > 0) {
      output.push({ word, count: root.count });
    }

    Array.from(root.children).forEach(([key, _child]) => {
      word += key;
      this.findAllWords(root.children.get(key) ?? new TrieNode(), word, output);
      word = word.slice(0, -1);
    });
  }

  insert(word: string) {
    if (typeof word !== "string") {
      return;
    }

    if (word === "") {
      if (this.root) {
        this.root.count += 1;
      }
      return;
    }

    let node = this.root;
    Array.from(word).forEach((char) => {
      if (node === undefined) {
        return;
      }

      if (node.children.get(char as T) === undefined) {
        node.children.set(char as T, new TrieNode(char as T, node));
      }

      node = node.children.get(char as T);
    });

    if (node) {
      node.count += 1;
    }
  }

  findPrefix(word: string) {
    if (typeof word !== "string") {
      return;
    }

    let node = this.root;
    Array.from(word).forEach((char) => {
      if (node === undefined) {
        return;
      }

      if (node.children.get(char as T) === undefined) {
        return;
      }

      node = node.children.get(char as T);
    });

    return node;
  }

  remove(word: string, count: number) {
    if (typeof word !== "string") {
      return;
    }
    if (typeof count !== "number") {
      count = 1;
    } else if (count < 1) {
      return;
    }

    // for empty string, delete count of root
    if (word === "") {
      if (!this.root) {
        return;
      }

      if (this.root.count >= count) {
        this.root.count -= count;
      } else {
        this.root.count = 0;
      }

      return;
    }

    let child = this.root;
    Array.from(word).forEach((char) => {
      if (child === undefined) {
        return;
      }

      if (child.children.get(char as T) === undefined) {
        return;
      }

      child = child.children.get(char as T);
    });

    // delete number of occurrences specified

    if (child) {
      if (child.count >= count) {
        child.count -= count;
      } else {
        child.count = 0;
      }
    }

    // if some occurrences remain, do not delete the node
    // else if the object forms some other object's prefix, do not delete the node
    // else delete the node and its parent's reference to it
    if (child) {
      const { children, count, key, parent } = child;
      if (count <= 0 && children.size) {
        parent?.children.delete(key);
      }
    }
  }

  findAllWords(prefix: string) {
    const output = [] as Array<{ word: string; count: number }>;
    // find node with provided prefix
    const node = this.findPrefix(prefix);
    if (node === undefined) {
      return output;
    }
    Trie.findAllWords(node, prefix, output);
    return output;
  }

  contains(word: string) {
    // find node with given prefix
    const node = this.findPrefix(word);
    // no such node exists
    return node?.count && node.count > 0;
  }

  findOccurrences(word: string) {
    // find node with given prefix
    const node = this.findPrefix(word);
    // no such node exists
    return node?.count ?? 0;
  }
}

export { Trie, TrieNode };

*/

/**
class TrieNode<T extends string = string> {
  isEndOfWord: boolean;
  children: Map<T, TrieNode<T>>;

  constructor(public value: T | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = new Map();
  }
}

class Trie {
  root: TrieNode<string> | null;
  constructor(public words: string[] = []) {
    this.root = new TrieNode(null);
    this.words = words;
    words
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      .forEach((word) => this.insert(word));
  }

  insert(word: string) {
    if (!word.length) {
      return;
    }

    let current = this.root;

    Array.from(word).forEach((char) => {
      if (current?.children.get(char) === undefined) {
        current?.children.set(char, new TrieNode(char));
      }

      current = current?.children.get(char) ?? null;
    });

    if (current) {
      current.isEndOfWord = true;
    }
  }

  search(word: string) {
    if (!word.length) {
      return false;
    }

    let current = this.root;

    Array.from(word).forEach((char) => {
      if (current?.children.get(char) === undefined) {
        return false;
      }

      current = current?.children.get(char) ?? null;
    });

    return current?.isEndOfWord ?? false;
  }

  autoComplete(prefix: string) {
    let current = this.root;

    Array.from(prefix).forEach((char) => {
      if (current?.children.get(char) === undefined) {
        return [];
      }

      current = current?.children.get(char) ?? null;
    });

    const result: string[] = [];
    this.findAllWords(current, prefix, result);

    return result;
  }

  findAllWords(root: TrieNode<string> | null, word: string, result: string[]) {
    if (!root) {
      return;
    }

    const { children, isEndOfWord } = root;

    if (isEndOfWord) {
      result.push(word);
    }

    Array.from(children).forEach(([key, child]) => {
      this.findAllWords(child, word + key, result);
    });
  }
}

export { Trie, TrieNode };

*/

/**
import { v4 as uuidv4 } from "uuid";

type Tree<T extends string = string> = {
  children: Array<Tree<T>>;
  data: T;
  id: string;
  parentId: string | undefined;
};

function generateTrees(strings: string[]): Tree[] {
  const treesMap = strings.reduce<Map<string, Tree>>((treesAcc, string, stringIndex) => {
    string.split("").forEach((char, charIndex) => {
      const tempKey = `${stringIndex}${charIndex}`;

      if (charIndex === 0) {
        const parent: Tree = {
          children: [],
          data: char,
          id: uuidv4(),
          parentId: void 0,
        };
        treesAcc.set(tempKey, parent);

        return treesAcc;
      }

      const prevTempKey = `${stringIndex}${charIndex - 1}`;
      const prev = treesAcc.get(prevTempKey);
      if (!prev) {
        return;
      }

      const child: Tree = {
        children: [],
        data: char,
        id: uuidv4(),
        parentId: prev.id,
      };
      treesAcc.set(tempKey, child);
    });

    return treesAcc;
  }, new Map());

  return Array.from(treesMap).map(([_, value]) => value);
}

type IdIndexMap = Map<string, number>;

function generateIdMap(trees: Tree[]): IdIndexMap {
  return trees.reduce<IdIndexMap>((mapAcc, tree, index) => {
    mapAcc.set(tree.id, index);

    return mapAcc;
  }, new Map());
}

function generateTree(idIndexMap: IdIndexMap, trees: Tree[]) {
  let roots: Tree[] = [];

  trees.forEach((tree) => {
    if (tree.parentId === undefined) {
      roots.push(tree);
      return;
    }

    const parentIndex = idIndexMap.get(tree.parentId);
    if (!parentIndex) {
      return;
    }

    const parent = trees[parentIndex];
    parent.children.push(tree);
  });

  return roots;

  // return trees.reduce<Tree[]>((treesAcc, tree) => {
  //   if (tree.parentId === undefined) {
  //     treesAcc.push(tree);
  //     return treesAcc;
  //   }

  //   const parentIndex = idIndexMap.get(tree.parentId);
  //   if (!parentIndex) {
  //     return treesAcc;
  //   }

  //   const parent = trees[parentIndex];
  //   parent.children.push(tree);

  //   return treesAcc;
  // }, []);
}

export { generateIdMap, generateTree, generateTrees };
 */
