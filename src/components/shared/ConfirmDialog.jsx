import React from "react";
import { FaTrash, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning', 'danger', 'info'
}) {
  if (!isOpen) return null;

  const typeStyles = {
    warning: {
      icon: <FaExclamationTriangle className="text-white" />,
      confirmButton: "bg-warm-yellow hover:bg-yellow-600 text-black",
      iconBg: "bg-warm-yellow",
    },
    danger: {
      icon: <FaTrash className="text-white" />,
      confirmButton: "bg-red-900 hover:bg-red-800 text-white",
      iconBg: "bg-red-900",
    },
    info: {
      icon: <FaInfoCircle className="text-white" />,
      confirmButton: "bg-info-blue hover:bg-blue-600 text-white",
      iconBg: "bg-info-blue",
    },
  };

  const currentStyle = typeStyles[type];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 ${currentStyle.iconBg} rounded-full flex items-center justify-center mr-3`}
            >
              {currentStyle.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${currentStyle.confirmButton}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for easier usage
export function useConfirmDialog() {
  const [dialog, setDialog] = React.useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "warning",
  });

  const showConfirm = (options) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        title: options.title || "Confirm Action",
        message: options.message || "Are you sure?",
        type: options.type || "warning",
        onConfirm: () => {
          resolve(true);
          setDialog((prev) => ({ ...prev, isOpen: false }));
        },
      });
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      isOpen={dialog.isOpen}
      onClose={closeDialog}
      onConfirm={dialog.onConfirm}
      title={dialog.title}
      message={dialog.message}
      type={dialog.type}
    />
  );

  return { showConfirm, ConfirmDialogComponent };
}
