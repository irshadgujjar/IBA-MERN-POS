// InventoryItem.js
import React, { useState } from 'react';

const InventoryItem = ({ item, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border p-4 mb-2 rounded cursor-pointer">
      <div className="flex items-center justify-between" onClick={handleItemClick}>
        <div>
          <span className="font-semibold">{item.name}</span>
          <span className="ml-2 text-gray-600">ID: {item.id}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={(e) => {
            e.stopPropagation(); // Prevent handleItemClick from triggering
            onClick();
          }}
        >
          Generate Invoice
        </button>
      </div>
      {isExpanded && (
        <div>
          {/* Display other inventory details here */}
        </div>
      )}
    </div>
  );
};

export default InventoryItem;
