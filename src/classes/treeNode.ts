class TreeNode<T extends unknown = unknown> {
  constructor(
    public data: T,
    public leftChild?: TreeNode<T>,
    public rightChild?: TreeNode<T>
  ) {}
}

export { TreeNode };
