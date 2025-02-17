// context/ToastContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react';

// Define the possible toast types
export type ToastType = 'success' | 'info' | 'error';

// Define the shape of a Toast
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

// Define the context type that will hold our showToast function
interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

// Create the context with an undefined default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// A helper variable for unique toast IDs
let toastIdCounter = 0;

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  // Store active toasts in state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast
  const showToast = (message: string, type: ToastType) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container styled with Tailwind CSS for demonstration */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded shadow-md text-white 
              ${
                toast.type === 'success'
                  ? 'bg-green-500'
                  : toast.type === 'info'
                  ? 'bg-blue-500'
                  : 'bg-red-500'
              }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook for consuming the ToastContext
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};