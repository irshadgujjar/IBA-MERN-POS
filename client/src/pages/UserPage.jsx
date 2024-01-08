import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const UserTable = ({ users }) => {
  return 
  <table className="min-w-full divide-y divide-gray-200">

  </table>;
};

const InventoryItem = ({ user = {}, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          "/api/user/getallusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div
      className="border p-4 mb-2 rounded"
      style={{ marginTop: "70px", marginLeft: "290px", width: "930px" }}
    >
      <div>
        <h2 className="text-2xl font-semibold mb-4">All users</h2>
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr>
              <th className="border border-black bg-gray-200 p-2">user ID</th>
              <th className="border border-black bg-gray-200 p-2">Name</th>
              <th className="border border-black bg-gray-200 p-2">
                User Email
              </th>
              <th className="border border-black bg-gray-200 p-2">Role</th>
              <th className="border border-black bg-gray-200 p-2">Joining</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-black p-2">{user.id}</td>
                <td className="border border-black p-2">{user.username}</td>
                <td className="border border-black p-2">{user.email}</td>
                <td className="border border-black p-2">{user.role}</td>
                <td className="border border-black p-2">{user.joining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default InventoryItem;
