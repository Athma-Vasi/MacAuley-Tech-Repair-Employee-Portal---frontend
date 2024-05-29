class TrieNode {
  constructor(
    public key: string,
    public parent: TrieNode | null = null,
    public children: Map<string, TrieNode> = new Map()
  ) {
    if (parent) {
      parent.children.set(key, this);
    }
  }
}

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
