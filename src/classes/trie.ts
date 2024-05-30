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
