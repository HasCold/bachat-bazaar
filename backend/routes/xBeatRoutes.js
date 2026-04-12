const express = require('express');
const router = express.Router();
const {
  getProducts,
  getMeta,
  getProductByPlatformSlug,
  getRelatedProducts,
} = require('../controllers/xBeat/productController');

router.get('/meta', getMeta);
router.get('/products', getProducts);
router.get('/products/:platform/:slug/related', getRelatedProducts);
router.get('/products/:platform/:slug', getProductByPlatformSlug);

module.exports = router;
