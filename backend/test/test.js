const assert = require('assert');
const segmentTreeService = require('../src/services/segmentTreeService');

function resetService(array = [2, 5, 1, 4, 9, 3]) {
  const result = segmentTreeService.setArray(array);
  assert.equal(result.success, true, 'setArray should succeed');
}

function run() {
  resetService();

  const sum = segmentTreeService.querySum(1, 4);
  assert.equal(sum.success, true);
  assert.equal(sum.result, 19, 'sum query should match expected value');

  const min = segmentTreeService.queryMin(1, 4);
  assert.equal(min.success, true);
  assert.equal(min.result, 1, 'min query should match expected value');

  const max = segmentTreeService.queryMax(1, 4);
  assert.equal(max.success, true);
  assert.equal(max.result, 9, 'max query should match expected value');

  const update = segmentTreeService.updateRange(1, 3, 2);
  assert.equal(update.success, true, 'range update should succeed');

  assert.deepEqual(
    segmentTreeService.getArray(),
    [2, 7, 3, 6, 9, 3],
    'array should reflect lazy range update'
  );

  assert.equal(segmentTreeService.querySum(1, 4).result, 25, 'updated sum should be correct');
  assert.equal(segmentTreeService.queryMin(1, 4).result, 3, 'updated min should be correct');
  assert.equal(segmentTreeService.queryMax(1, 4).result, 9, 'updated max should be correct');

  const invalid = segmentTreeService.querySum(4, 1);
  assert.equal(invalid.success, false, 'invalid ranges should be rejected');

  resetService([]);
  assert.equal(segmentTreeService.querySum(0, 0).success, false, 'empty arrays should reject queries');

  console.log('All backend segment tree tests passed.');
}

run();
