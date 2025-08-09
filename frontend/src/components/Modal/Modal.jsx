import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full pointer-events-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;