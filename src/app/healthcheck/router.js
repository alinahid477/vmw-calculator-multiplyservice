const express = require('express');

const router = express.Router();

router.get('/healthcheck', async (req, res) => {
  console.log('healthcheck..');
  res.success({ message: 'I am working.' });
});

module.exports = router;