const express = require('express');
const router = express.Router();

// GET partners
router.get('/', (req, res) => {
  res.json({
    success: true,
    partners: []
  });
});

module.exports = router;
