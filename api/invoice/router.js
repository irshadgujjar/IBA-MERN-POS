const express = require("express");
const router = express.Router();
const invoiceController = require("./controller");

router.post("/add-invoice", invoiceController.createInvoice);
router.get("/get-all-invoices", invoiceController.getAllInvoices);
router.put("/update-invoice", invoiceController.updateInvoice);
router.delete("/delete-invoice", invoiceController.deleteInvoice);

module.exports = router;
