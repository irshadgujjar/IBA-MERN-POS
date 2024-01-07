import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    CategoryName: "",
    CategoryImage: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3000/api/categories/get-all-categories")
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };

    fetchData();
  }, []);

  const deleteCategory = (_id) => {
    axios
      .delete("http://localhost:3000/api/categories/delete-category", {
        data: { _id },
      })
      .then(() => {
        refreshCategories();
        toast.success("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category!");
      });
  };

  const editCategory = (_id) => {
    axios
      .get(`http://localhost:3000/api/categories/get-category-by-id?_id=${_id}`)
      .then((response) => {
        const category = response.data.category;
        setFormData({
          _id: category._id,
          CategoryName: category.CategoryName,
          CategoryImage: category.CategoryImage,
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      });
  };

  const saveCategory = () => {
    if (formData._id) {
      axios
        .put("http://localhost:3000/api/categories/update-category", formData)
        .then(() => {
          toast.success("Category updated successfully!");
        })
        .catch((error) => {
          console.error("Error saving category:", error);
        });
    } else {
      axios
        .post("http://localhost:3000/api/categories/create-category", formData)
        .then(() => {
          toast.success("Category created successfully!");
        })
        .catch((error) => {
          console.error("Error saving category:", error);
        });
    }

    closeAndRefreshModal();
  };

  const closeAndRefreshModal = () => {
    setShowModal(false);
    refreshCategories();
  };

  const refreshCategories = () => {
    axios
      .get("http://localhost:3000/api/categories/get-all-categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error refreshing categories:", error);
      });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        className="container mx-auto mt-8"
        style={{ marginTop: "70px", marginLeft: "290px", width: "930px" }}
      >
        <div className="flex justify-between items-center p-4 mb-4 rounded text-white">
          <span className="text-2xl font-bold">Categories</span>
          <button
            className="bg-slate-900 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Add Category
          </button>
        </div>
        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Category Name</th>
                <th className="py-2 px-4 text-left">Category Image</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((val, key) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-red-900">{val._id}</td>
                  <td className="py-2 px-4 text-green-900">
                    {val.CategoryName}
                  </td>
                  <td className="py-2 px-4">
                    <img
                      src={val.CategoryImage}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="bg-red-900 text-white px-4 py-2 rounded"
                      onClick={() => deleteCategory(val._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="bg-slate-900 text-white px-4 py-2 rounded"
                      onClick={() => editCategory(val._id)}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toast Container */}
        <ToastContainer position="bottom-right" autoClose={3000} />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold mb-4">
                {formData._id ? "Edit Category" : "Add Category"}
              </h2>
              <label className="block mb-2">Category Name:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 mb-4"
                value={formData.CategoryName}
                onChange={(e) =>
                  setFormData({ ...formData, CategoryName: e.target.value })
                }
              />
              <label className="block mb-2">Category Image:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 mb-4"
                value={formData.CategoryImage}
                onChange={(e) =>
                  setFormData({ ...formData, CategoryImage: e.target.value })
                }
              />
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={saveCategory}
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
      <Footer />
    </>
  );
}
