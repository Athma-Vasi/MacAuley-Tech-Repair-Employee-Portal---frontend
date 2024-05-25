import { boyerMooreHorspoolSimpleSearch } from "../components/repairTicket/create/utils";
import { TreeNode } from "./treeNode";

class BinarySearchTree<T extends string | number = string | number> {
  rootNode?: TreeNode<T>;

  constructor(public data: T[] = []) {
    this.rootNode = void 0;
    this.data.forEach((data) => this.insert(data));
  }

  findMax(): T | undefined {
    if (!this.rootNode) {
      return;
    }

    function traverse(node: TreeNode<T>): T {
      return node.rightChild ? traverse(node.rightChild) : node.data;
    }

    return traverse(this.rootNode);
  }

  findMin(): T | undefined {
    if (!this.rootNode) {
      return;
    }

    function traverse(node: TreeNode<T>): T {
      return node.leftChild ? traverse(node.leftChild) : node.data;
    }

    return traverse(this.rootNode);
  }

  private findNode(data: T): TreeNode<T> | undefined {
    if (!this.rootNode) {
      return;
    }

    let currentNode = this.rootNode;
    while (currentNode.data !== data) {
      if (data > currentNode.data) {
        if (!currentNode.rightChild) {
          return;
        }

        currentNode = currentNode.rightChild;
      } else {
        if (!currentNode.leftChild) {
          return;
        }

        currentNode = currentNode.leftChild;
      }
    }

    return currentNode;
  }

  has(data: T): boolean {
    if (!this.rootNode) {
      return false;
    }

    let currentNode = this.rootNode;
    while (currentNode.data !== data) {
      if (data > currentNode.data) {
        if (!currentNode.rightChild) {
          return false;
        }

        currentNode = currentNode.rightChild;
      } else {
        if (!currentNode.leftChild) {
          return false;
        }

        currentNode = currentNode.leftChild;
      }
    }

    return true;
  }

  insert(data: T): void {
    if (!this.rootNode) {
      this.rootNode = new TreeNode(data);
      return;
    }

    let currentNode: TreeNode<T> = this.rootNode;
    while (true) {
      if (data > currentNode.data) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild;
        } else {
          currentNode.rightChild = new TreeNode<T>(data);
          return;
        }
      } else {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode.leftChild = new TreeNode<T>(data);
          return;
        }
      }
    }
  }

  inOrderChildren(data: T): T[] {
    const node = this.findNode(data);

    if (!node) {
      return [];
    }

    return this.inOrderTraversal(node, []);
  }

  private inOrderTraversal(node?: TreeNode<T>, array: T[] = []): T[] {
    if (!node) {
      return array;
    }

    function traverse(node?: TreeNode<T>, array: T[] = []): T[] {
      if (!node) {
        return array;
      }

      traverse(node.leftChild, array);
      array.push(node.data);
      traverse(node.rightChild, array);

      return array;
    }

    return traverse(node, array);
  }

  isEmpty(): boolean {
    return this.rootNode === void 0;
  }

  preOrderChildren(data: T): T[] {
    const node = this.findNode(data);

    if (!node) {
      return [];
    }

    return this.preOrderTraversal(node, []);
  }

  private preOrderTraversal(node?: TreeNode<T>, array: T[] = []): T[] {
    if (!node) {
      return array;
    }

    function traverse(node?: TreeNode<T>, array: T[] = []): T[] {
      if (!node) {
        return array;
      }

      array.push(node.data);
      traverse(node.leftChild, array);
      traverse(node.rightChild, array);

      return array;
    }

    return traverse(node, array);
  }

  postOrderChildren(data: T): T[] {
    const node = this.findNode(data);

    if (!node) {
      return [];
    }

    return this.postOrderTraversal(node, []);
  }

  private postOrderTraversal(node?: TreeNode<T>, array: T[] = []): T[] {
    if (!node) {
      return array;
    }

    function traverse(node?: TreeNode<T>, array: T[] = []): T[] {
      if (!node) {
        return array;
      }

      traverse(node.leftChild, array);
      traverse(node.rightChild, array);
      array.push(node.data);

      return array;
    }

    return traverse(node, array);
  }

  search(prefix: string): T[] {
    const results: T[] = [];
    this.searchNode(this.rootNode, prefix, results);
    return results;
  }

  private searchNode(node: TreeNode<T> | undefined, prefix: string, results: T[]): void {
    if (!node) {
      return;
    }

    if (
      boyerMooreHorspoolSimpleSearch(
        prefix.toLowerCase(),
        node.data.toString().toLowerCase()
      ) !== -1
    ) {
      results.push(node.data);
    }

    if (node.leftChild) {
      this.searchNode(node.leftChild, prefix, results);
    }

    if (node.rightChild) {
      this.searchNode(node.rightChild, prefix, results);
    }
  }
}

export { BinarySearchTree };
