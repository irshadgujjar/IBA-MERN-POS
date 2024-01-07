const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    paymentMode: { type: String, required: true },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
