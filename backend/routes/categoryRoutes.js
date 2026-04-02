const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/categories - all categories with counts
router.get('/', async (req, res) => {
  try {
    const cats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data: cats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
