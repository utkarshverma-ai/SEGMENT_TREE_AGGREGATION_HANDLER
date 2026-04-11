const express = require('express');
const {
  queryHandler,
  updateHandler,
  setArrayHandler,
  compareHandler,
  getStateHandler,
  resetHandler
} = require('../controllers/segmentTreeController');

const router = express.Router();

router.get('/sum', (req, res) => {
  const l = parseInt(req.query.l);
  const r = parseInt(req.query.r);
  const result = queryHandler('sum', l, r);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ method: 'segment-tree', range: [l, r], queryType: 'sum', result: result.result });
});

router.get('/min', (req, res) => {
  const l = parseInt(req.query.l);
  const r = parseInt(req.query.r);
  const result = queryHandler('min', l, r);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ method: 'segment-tree', range: [l, r], queryType: 'min', result: result.result });
});

router.get('/max', (req, res) => {
  const l = parseInt(req.query.l);
  const r = parseInt(req.query.r);
  const result = queryHandler('max', l, r);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ method: 'segment-tree', range: [l, r], queryType: 'max', result: result.result });
});

router.post('/update', async (req, res) => {
  const { l, r, val } = req.body;
  const result = await updateHandler(l, r, val);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({
    success: true,
    message: 'Range updated successfully with lazy propagation',
    updatedRange: [l, r],
    addedValue: val,
    warning: result.warning,
    array: require('../services/segmentTreeService').getArray()
  });
});

router.post('/array', async (req, res) => {
  const { array } = req.body;
  if (!array || !Array.isArray(array)) {
    return res.status(400).json({ error: 'Array is required and must be an array' });
  }
  const result = await setArrayHandler(array);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({
    success: true,
    message: 'Array set successfully. Segment tree rebuilt.',
    warning: result.warning,
    array
  });
});

router.get('/compare', async (req, res) => {
  const l = parseInt(req.query.l);
  const r = parseInt(req.query.r);
  const result = await compareHandler(l, r);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

router.get('/state', (req, res) => {
  res.json(getStateHandler());
});

router.get('/reset', async (req, res) => {
  const result = await resetHandler();
  res.json({
    success: true,
    message: 'Array and segment tree reset to default',
    warning: result.warning,
    array: result.array
  });
});

module.exports = router;
