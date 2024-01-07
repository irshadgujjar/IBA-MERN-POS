const Invoice = require("./model");
const { connect } = require('mongoose');
require('dotenv').config();

const createInvoice = async (req, res) => {
  const { body } = req;

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in the environment variables");
    }

    await connect(process.env.MONGO_URI);
    const invoice = new Invoice(body);
    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully", data: invoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in the environment variables");
    }

    await connect(process.env.MONGO_URI);
    const invoices = await Invoice.find();
    res.status(200).json({ data: invoices });
  } catch (error) {
    console.error("Error getting all invoices:", error);
    res.status(500).json({ error: "Failed to retrieve invoices" });
  }
};

const updateInvoice = async (req, res) => {
  const { body } = req;

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in the environment variables");
    }

    await connect(process.env.MONGO_URI);
    await Invoice.findByIdAndUpdate(body.invoiceId, body);
    res.status(200).json({ message: "Invoice updated successfully" });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Failed to update invoice" });
  }
};

const deleteInvoice = async (req, res) => {
  const { body } = req;

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in the environment variables");
    }

    await connect(process.env.MONGO_URI);
    await Invoice.findByIdAndDelete(body.invoiceId);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Failed to delete invoice" });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
};
