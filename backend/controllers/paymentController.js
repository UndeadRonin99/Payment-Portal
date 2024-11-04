const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { amount, currency, provider, accountInfo, swiftCode } = req.body;
  try {
    const payment = new Payment({
      customerId: req.user.userId,
      amount,
      currency,
      provider,
      accountInfo,
      swiftCode
    });
    await payment.save();
    res.status(201).json({ message: 'Payment created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    payment.verified = true;
    await payment.save();
    res.json({ message: 'Payment verified successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnverifiedPayments = async (req, res, next) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const payments = await Payment.find({ verified: false });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
