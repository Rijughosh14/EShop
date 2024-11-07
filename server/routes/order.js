
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Mock order processing
  const success = Math.random() > 0.1; // 90% success rate
  if (success) {
    res.json({ 
      success: true, 
      orderId: Math.random().toString(36).substring(7),
      message: 'Order placed successfully' 
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Payment processing failed' 
    });
  }
});

module.exports = router;