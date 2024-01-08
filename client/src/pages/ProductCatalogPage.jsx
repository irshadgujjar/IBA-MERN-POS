import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../assets/loader.gif";
import { CartContext } from "../CartContext/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete, MdEdit, MdAddShoppingCart, MdSearch } from "react-icons/md";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function ProductCatalogPage() {
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    api_featured_image: "",
    product_type: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/products/get-all-products")
      
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`/api/products/delete-product/${productId}`)
      .then(() => {
        toast.success("Product deleted successfully!");
        getData();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product!");
      });
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setShowUpdateModal(true);
  };

  const updateProduct = () => {
    axios
      .put(
        `/api/products/update-product/${selectedProduct._id}`,
        { ...formData, price: parseFloat(formData.price) }
      )
      .then(() => {
        toast.success("Product updated successfully!");
        getData();
        setSelectedProduct(null);
        resetForm();
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Error updating product!");
      });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      api_featured_image: "",
      product_type: "",
    });
  };

  const addtoCart = (product) => {
    if (!product) {
      console.error("Product data is not available.");
      return;
    }

    const isProductInCart = cart_state.cart.some(
      (cartItem) => cartItem._id === product._id
    );

    if (isProductInCart) {
      toast.warning("Product is already in the cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const payload = {
      ...product,
      quantity: 1,
      totalPrice: product.price,
    };

    setSelectedProduct(product);

    cart_dispatch({
      type: "ADD_TO_CART",
      payload,
    });

    toast.success("Product added to cart successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeAndRefreshModal = () => {
    setShowModal(false);
    refreshProducts();
  };

  const saveProduct = () => {
    if (selectedProduct && selectedProduct._id) {
      axios
        .put(
          `/api/products/update-product/${selectedProduct._id}`,
          formData
        )
        .then(() => {
          toast.success("Product updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Error updating product!");
        });
    } else {
      axios
        .post("/api/products/create-product", {
          ...formData,
          price: parseFloat(formData.price),
        })
        .then(() => {
          toast.success("Product created successfully!");
        })
        .catch((error) => {
          console.error("Error creating product:", error);
          toast.error("Error creating product!");
        });
    }

    closeAndRefreshModal();
  };

  const refreshProducts = () => {
    getData();
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
   <>
   <Navbar/>
   <Sidebar/>
   <div className="container mx-auto p-10">
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <img src={Loader} alt="Loading..." />
        </div>
      ) : (
        <div
          className="space-y-8"
          style={{ marginTop: "70px", marginLeft: "270px", width:"930px"}}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleSearch}
                >
                  <MdSearch />
                </button>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(true)}
              >
                Add Product
              </button>
            </div>
          </div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Product Image</th>
                <th className="py-2 px-4 border">Cateory</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={product.api_featured_image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 border">{product.product_type}</td>
                  <td className="py-2 px-4 border">
                    {typeof product.price === "number"
                      ? `$${product.price.toFixed(2)}`
                      : "Invalid Price"}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => editProduct(product)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => addtoCart(product)}
                    >
                      <MdAddShoppingCart />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">
              {selectedProduct._id ? "Edit Product" : "Add Product"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">Product Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Product Price:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Product Image:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.api_featured_image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      api_featured_image: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={updateProduct}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedProduct(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">
              {formData._id ? "Edit Product" : "Add Product"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">Product Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Product Image:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.api_featured_image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      api_featured_image: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Price:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Category:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 mb-4"
                  value={formData.product_type}
                  onChange={(e) =>
                    setFormData({ ...formData, product_type: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={saveProduct}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={closeAndRefreshModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   <Footer/>
   </>
  );
}
