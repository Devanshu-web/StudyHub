const express = require('express');
const router = express.Router();

// GET study resources
router.get('/', (req, res) => {
  res.json({
    success: true,
    resources: []
  });
});

module.exports = router;
