const SegmentTree = require('../segmentTree/SegmentTree');

const DEFAULT_ARRAY = [2, 5, 1, 4, 9, 3];

class SegmentTreeService {
  constructor() {
    this.array = [...DEFAULT_ARRAY];
    this.segmentTree = new SegmentTree(this.array);
  }

  validateRange(l, r) {
    if (typeof l !== 'number' || typeof r !== 'number' || isNaN(l) || isNaN(r)) {
      return { valid: false, error: 'Indices must be valid numbers' };
    }
    if (l < 0 || r < 0) {
      return { valid: false, error: 'Indices cannot be negative' };
    }
    if (l > r) {
      return { valid: false, error: 'Left index must be less than or equal to right index' };
    }
    if (r >= this.array.length) {
      return { valid: false, error: `Right index exceeds array bounds (max: ${this.array.length - 1})` };
    }
    return { valid: true };
  }

  querySum(l, r) {
    const validation = this.validateRange(l, r);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    return {
      success: true,
      result: this.segmentTree.querySum(1, 0, this.array.length - 1, l, r)
    };
  }

  queryMin(l, r) {
    const validation = this.validateRange(l, r);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    return {
      success: true,
      result: this.segmentTree.queryMin(1, 0, this.array.length - 1, l, r)
    };
  }

  queryMax(l, r) {
    const validation = this.validateRange(l, r);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    return {
      success: true,
      result: this.segmentTree.queryMax(1, 0, this.array.length - 1, l, r)
    };
  }

  updateRange(l, r, val) {
    if (typeof val !== 'number' || isNaN(val)) {
      return { success: false, error: 'Update value must be a valid number' };
    }
    const validation = this.validateRange(l, r);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    this.segmentTree.update(1, 0, this.array.length - 1, l, r, val);
    for (let i = l; i <= r; i++) {
      this.array[i] += val;
    }
    return { success: true };
  }

  setArray(newArray) {
    if (!Array.isArray(newArray)) {
      return { success: false, error: 'Input must be an array' };
    }
    if (!newArray.every(v => typeof v === 'number' && !isNaN(v))) {
      return { success: false, error: 'All elements must be valid numbers' };
    }
    this.array = [...newArray];
    this.segmentTree = new SegmentTree(this.array);
    return { success: true };
  }

  getArray() {
    return [...this.array];
  }

  getState() {
    return {
      array: this.getArray(),
      treeState: this.segmentTree.getTreeState()
    };
  }

  reset() {
    this.array = [...DEFAULT_ARRAY];
    this.segmentTree = new SegmentTree(this.array);
    return { success: true, array: this.array };
  }
}

module.exports = new SegmentTreeService();
