const express = require('express');
const router = express.Router();

// POST contact form
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  res.json({
    success: true,
    message: 'Contact form submitted successfully'
  });
});

module.exports = router;
