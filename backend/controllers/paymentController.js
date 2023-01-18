const submitPayment = async (req, res) => {
  try {
    const cvv = req.body.cvv;
    const cardNumber = req.body.cardNumber;
    const cardName = req.body.cardName;
    const cardExpiration = req.body.cardExpiration;

    if (!cvv || !cardNumber || !cardName || !cardExpiration) {
      return res.status(422).json({
        success: false,
        message: "Invalid card",
        payload: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment submitted",
      payload: [],
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      payload: [],
    });
  }
};

module.exports = {
  submitPayment,
};
