const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const {
  getProducts,
  getMeta,
  getProductByPlatformSlug,
  getRelatedProducts,
} = require('../controllers/xBeat/productController');
const { predictPrice } = require('../controllers/xBeat/predictController');

router.use(requireAuth);

router.get('/meta', getMeta);
router.get('/products', getProducts);
router.get('/products/:platform/:slug/related', getRelatedProducts);
router.get('/products/:platform/:slug', getProductByPlatformSlug);
router.post('/predict', predictPrice);

module.exports = router;
