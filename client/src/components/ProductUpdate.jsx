import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

function ProductUpdate({ show, handleClose, updateProduct, product }) {
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    brand: product ? product.brand : "",
    price: product ? product.price : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(formData);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      style={{ marginTop: "70px", marginLeft: "290px", width: "930px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productBrand"
              className="block text-sm font-medium text-gray-700"
            >
              Product Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="text"
              id="productPrice"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductUpdate;
