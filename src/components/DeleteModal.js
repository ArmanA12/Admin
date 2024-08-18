// DeleteModal.js
import React from 'react';
import { FiX } from 'react-icons/fi';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-97">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Delete Member Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>
        <p className="mb-4">Are you sure you want to delete this member details? This action cannot be <br/>undone.</p>
        <div className="flex justify-end space-x-4">
          {/* <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button> */}
          <button onClick={onDelete} className="bg-[#6941C6] text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
