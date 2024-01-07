import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const CustomerModal = ({
  isOpen,
  onClose,
  onGenerateInvoice,
  onAddCustomer,
}) => {};

const CustomerTable = ({ customers, onGenerateInvoice }) => {
  return (
    <table className="w-full border-collapse border border-black mb-4">
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="border border-black p-2">{customer.customerName}</td>
            <td className="border border-black p-2">{customer.paymentMode}</td>
            <td className="border border-black p-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => onGenerateInvoice(customer)}
              >
                Generate Invoice
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const InventoryPage = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch all invoices when the component mounts
    const fetchAllInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/invoices/get-all-invoices"
        );
        setInvoices(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchAllInvoices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const handleGenerateInvoice = async (customer) => {
    try {
      // Call the server to generate an invoice for the selected customer
      const response = await axios.post(
        "http://localhost:3000/api/invoices/add-invoice",
        {
          customerId: customer.id,
        }
      );

      if (response.status === 200) {
        // Refresh the list of invoices
        const updatedInvoices = await axios.get(
          "http://localhost:3000/api/invoices/get-all-invoices"
        );
        setInvoices(updatedInvoices.data.data);
      } else {
        throw new Error("Failed to generate invoice");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        className="p-4 rounded-md mt-8 mx-auto max-w-4xl"
        style={{ marginTop: "70px", marginLeft: "280px" }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Inventory</h2>

        {/* Customer Table */}
        <CustomerTable
          customers={customers}
          onGenerateInvoice={handleGenerateInvoice}
        />

        {/* Display Invoices */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Invoices</h2>
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border border-black bg-gray-200 p-2">
                  Invoice ID
                </th>
                <th className="border border-black bg-gray-200 p-2">
                  Customer Name
                </th>
                <th className="border border-black bg-gray-200 p-2">
                  Payment Mode
                </th>
                <th className="border border-black bg-gray-200 p-2">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="border border-black p-2">{invoice._id}</td>
                  <td className="border border-black p-2">
                    {invoice.customerName}
                  </td>
                  <td className="border border-black p-2">
                    {invoice.paymentMode}
                  </td>
                  <td className="border border-black p-2">
                    {invoice.totalAmount} $
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InventoryPage;
