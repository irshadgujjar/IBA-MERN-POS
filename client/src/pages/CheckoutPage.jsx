import React, { useContext, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { CartContext } from "../CartContext/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

// Function to generate a random ID
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000) + 1 * 200;
};

// Component to display the printed invoice
const InvoicePrintComponent = ({ invoice }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex justify-center mt-8">
        Invoice
      </h2>
      <h2 className="text-2xl font-semibold mb-4 text-red-800 flex justify-center mt-8">
        ID: {generateRandomId()}{" "}
      </h2>
      {invoice && invoice.items && (
        <div>
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border border-black bg-gray-200 p-2">Name</th>
                <th className="border border-black bg-gray-200 p-2">
                  Quantity
                </th>
                <th className="border border-black bg-gray-200 p-2">Price</th>
                <th className="border border-black bg-gray-200 p-2">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black p-2">{item.name}</td>
                  <td className="border border-black p-2">{item.quantity}</td>
                  <td className="border border-black p-2">${item.price}</td>
                  <td className="border border-black p-2">
                    ${item.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-red-800 font-semibold text-center">
            Total: ${invoice.total}
          </p>
        </div>
      )}
    </div>
  );
};

// Main CheckoutPage component
const CheckoutPage = () => {
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    paymentMode: "Cash",
    cartItems: [],
    totalAmount: 0,
  });

  const componentRef = useRef();

  // Increment quantity of a cart item
  const incrementQuantity = (id) => {
    cart_dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
  };

  // Decrement quantity of a cart item
  const decrementQuantity = (id) => {
    cart_dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    cart_dispatch({ type: "REMOVE_ITEM", payload: { id } });
    toast.success("Product removed from cart successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    cart_dispatch({ type: "CLEAR_CART" });
  };

  // Generate invoice from the cart
  const generateInvoice = () => {
    const items = cart_state?.cart || [];
    const generatedInvoice = {
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),
      total: calculateTotalPrice(),
    };
    setInvoice(generatedInvoice);
    setIsModalOpen(true);
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart_state?.cart
      ? cart_state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      : 0;
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // React-to-Print hook for printing the invoice
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add invoice to the backend
  const handleAddInvoice = async () => {
    try {
      const response = await axios.post(
        "/api/invoices/add-invoice",
        {
          customerName: customerData.customerName,
          paymentMode: customerData.paymentMode,
          cartItems: cart_state?.cart || [],
          totalAmount: calculateTotalPrice(),
        }
      );

      if (response.status === 201) {
        toast.success("Invoice added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Clear cart after successful invoice creation
        clearCart();
        closeModal(); // Close the modal
      } else {
        throw new Error("Failed to add invoice");
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
      toast.error("Failed to add invoice", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
 <>
 
 <Navbar/>
 <Sidebar/>
 <div className="flex" style={{ marginTop: "70px", marginLeft: "280px" }}>
      {/* Left side cart display */}
      <div className="flex-1 p-4 rounded-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Invoice</h2>
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr>
              <th className="border border-black bg-gray-200 p-2">Name</th>
              <th className="border border-black bg-gray-200 p-2">Quantity</th>
              <th className="border border-black bg-gray-200 p-2">Price</th>
              <th className="border border-black bg-gray-200 p-2">
                Total Price
              </th>
              <th className="border border-black bg-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart_state?.cart && cart_state.cart.length > 0 ? (
              cart_state.cart.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black p-2">{item.name}</td>
                  <td className="border border-black p-2">
                    <div className="flex items-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-l"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="quantity-value px-2">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-r"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </td>
                  <td className="border border-black text-red-900 font-semibold p-2">
                    ${item.price}
                  </td>
                  <td className="border border-black p-2">
                    ${item.price * item.quantity}
                  </td>
                  {!isPrinting && (
                    <td className="border border-black p-2">
                      <button
                        className="bg-red-800 text-white font-semibold px-2 py-1 rounded"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isPrinting ? "4" : "5"}
                  className="text-center py-4"
                >
                  {isPrinting ? "Printing..." : "No items in the cart."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-2xl font-bold my-4 text-center">
          Total: ${calculateTotalPrice()}
        </div>
        {cart_state?.cart && cart_state.cart.length > 0 && !isPrinting && (
          <div className="flex justify-center space-x-4">
            <button
              className="bg-red-900 text-white px-6 py-3 rounded"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-blue-900 text-white px-6 py-3 rounded"
              onClick={generateInvoice}
            >
              Generate Invoice
            </button>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="bg-white p-8 rounded-md shadow-md max-w-2xl"
              ref={componentRef}
            >
              <InvoicePrintComponent invoice={invoice} />

              {/* Use @media print rule to hide buttons during printing */}
              <style>
                {`
                 @media print {
                  .print-buttons {
                    display: none;
                  }
                }
              `}
              </style>

              <div className="flex justify-center mt-8 space-x-4 print-buttons">
                {/* Conditionally render based on isPrinting */}
                {!isPrinting && (
                  <>
                    <button
                      className="bg-red-800 text-white px-6 py-3 rounded"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white px-6 py-3 rounded"
                      onClick={handlePrint}
                    >
                      Print Invoice
                    </button>
                    <button
                      className="bg-green-600 text-white px-6 py-3 rounded"
                      onClick={handleAddInvoice}
                    >
                      Add Invoice
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side form for customer data */}
      <div className="flex-2 p-2">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Customer Information
        </h2>
        <form className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Customer Name</span>
            <input
              type="text"
              name="customerName"
              value={customerData.customerName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Payment Mode</span>
            <select
              name="paymentMode"
              value={customerData.paymentMode}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Cart Items</span>
            <textarea
              name="cartItems"
              value={JSON.stringify(cart_state?.cart || [])}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 text-gray-400 rounded-md"
              readOnly
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Total Amount</span>
            <input
              type="number"
              name="totalAmount"
              value={calculateTotalPrice()}
              onChange={() => {}} 
              className="border border-gray-300 p-2 text-gray-400 rounded-md"
              readOnly
              required
            />
          </label>
        </form>
        {/* <button
          className="bg-green-600 text-white px-6 py-3 rounded mt-4"
          onClick={handleAddInvoice}
        >
          Add Invoice
        </button> */}
      </div>
      <ToastContainer />
    </div>
 <Footer/>
 </>
   
  );
};

export default CheckoutPage;
