class SegmentTree {
  constructor(arr = []) {
    this.n = arr.length;
    this.arr = [...arr];
    this.sumTree = new Array(4 * Math.max(this.n, 1)).fill(0);
    this.minTree = new Array(4 * Math.max(this.n, 1)).fill(Infinity);
    this.maxTree = new Array(4 * Math.max(this.n, 1)).fill(-Infinity);
    this.lazy = new Array(4 * Math.max(this.n, 1)).fill(0);
    if (this.n > 0) {
      this.build(1, 0, this.n - 1);
    }
  }

  build(node, start, end) {
    if (start === end) {
      this.sumTree[node] = this.arr[start];
      this.minTree[node] = this.arr[start];
      this.maxTree[node] = this.arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.build(node * 2, start, mid);
    this.build(node * 2 + 1, mid + 1, end);

    this.sumTree[node] = this.sumTree[node * 2] + this.sumTree[node * 2 + 1];
    this.minTree[node] = Math.min(this.minTree[node * 2], this.minTree[node * 2 + 1]);
    this.maxTree[node] = Math.max(this.maxTree[node * 2], this.maxTree[node * 2 + 1]);
  }

  push(node, start, end) {
    if (this.lazy[node] !== 0) {
      const val = this.lazy[node];
      this.sumTree[node] += (end - start + 1) * val;
      this.minTree[node] += val;
      this.maxTree[node] += val;

      if (start !== end) {
        this.lazy[node * 2] += val;
        this.lazy[node * 2 + 1] += val;
      }
      this.lazy[node] = 0;
    }
  }

  update(node, start, end, l, r, val) {
    this.push(node, start, end);

    if (r < start || end < l || this.n === 0) return;

    if (l <= start && end <= r) {
      this.lazy[node] += val;
      this.push(node, start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.update(node * 2, start, mid, l, r, val);
    this.update(node * 2 + 1, mid + 1, end, l, r, val);

    this.sumTree[node] = this.sumTree[node * 2] + this.sumTree[node * 2 + 1];
    this.minTree[node] = Math.min(this.minTree[node * 2], this.minTree[node * 2 + 1]);
    this.maxTree[node] = Math.max(this.maxTree[node * 2], this.maxTree[node * 2 + 1]);
  }

  querySum(node, start, end, l, r) {
    if (this.n === 0) return 0;
    this.push(node, start, end);

    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.sumTree[node];

    const mid = Math.floor((start + end) / 2);
    return this.querySum(node * 2, start, mid, l, r) + 
           this.querySum(node * 2 + 1, mid + 1, end, l, r);
  }

  queryMin(node, start, end, l, r) {
    if (this.n === 0) return 0;
    this.push(node, start, end);

    if (r < start || end < l) return Infinity;
    if (l <= start && end <= r) return this.minTree[node];

    const mid = Math.floor((start + end) / 2);
    return Math.min(
      this.queryMin(node * 2, start, mid, l, r),
      this.queryMin(node * 2 + 1, mid + 1, end, l, r)
    );
  }

  queryMax(node, start, end, l, r) {
    if (this.n === 0) return -Infinity;
    this.push(node, start, end);

    if (r < start || end < l) return -Infinity;
    if (l <= start && end <= r) return this.maxTree[node];

    const mid = Math.floor((start + end) / 2);
    return Math.max(
      this.queryMax(node * 2, start, mid, l, r),
      this.queryMax(node * 2 + 1, mid + 1, end, l, r)
    );
  }

  getTreeState() {
    return {
      size: this.n,
      array: [...this.arr],
      sumTree: [...this.sumTree],
      minTree: [...this.minTree],
      maxTree: [...this.maxTree],
      lazy: [...this.lazy],
    };
  }

  getArray() {
    return [...this.arr];
  }
}

module.exports = SegmentTree;
