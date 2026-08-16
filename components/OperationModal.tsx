"use client";

import React from "react";
import { CheckCircle2, AlertCircle, HelpCircle, X } from "lucide-react";

type ModalType = "success" | "error" | "confirm";

interface OperationModalProps {
  isOpen: boolean;
  type?: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

const OperationModal: React.FC<OperationModalProps> = ({
  isOpen,
  type = "success",
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  const Icon =
    type === "success"
      ? CheckCircle2
      : type === "error"
        ? AlertCircle
        : HelpCircle;

  const iconClass =
    type === "success"
      ? "text-green-500"
      : type === "error"
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-2xl border border-base-300 animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex items-center gap-3">
            <Icon className={`h-7 w-7 ${iconClass}`} />

            <h2 className="text-xl font-bold">{title}</h2>
          </div>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <div className="px-6 py-5">
          <p className="text-base-content/70 leading-relaxed">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          {type === "confirm" && (
            <button onClick={onClose} className="btn btn-ghost">
              {cancelText}
            </button>
          )}

          <button
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              } else {
                onClose();
              }
            }}
            className={
              type === "error"
                ? "btn btn-error"
                : type === "confirm"
                  ? "btn btn-error"
                  : "btn btn-success"
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationModal;
