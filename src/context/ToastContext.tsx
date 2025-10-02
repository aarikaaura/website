// src/context/ToastContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X, ShoppingBag, Heart } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "cart" | "wishlist";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showCart: (message: string) => void;
  showWishlist: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "success", duration: number = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Convenience methods
  const showSuccess = (message: string) => showToast(message, "success");
  const showError = (message: string) => showToast(message, "error");
  const showWarning = (message: string) => showToast(message, "warning");
  const showInfo = (message: string) => showToast(message, "info");
  const showCart = (message: string) => showToast(message, "cart");
  const showWishlist = (message: string) => showToast(message, "wishlist");

  const getToastConfig = (type: ToastType) => {
    const config = {
      success: {
        icon: CheckCircle,
        bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
        textColor: "text-white",
        borderColor: "border-green-400",
        iconColor: "text-white",
        progressColor: "bg-green-300",
      },
      error: {
        icon: XCircle,
        bgColor: "bg-gradient-to-r from-red-500 to-rose-600",
        textColor: "text-white",
        borderColor: "border-red-400",
        iconColor: "text-white",
        progressColor: "bg-red-300",
      },
      warning: {
        icon: AlertCircle,
        bgColor: "bg-gradient-to-r from-amber-500 to-orange-500",
        textColor: "text-white",
        borderColor: "border-amber-400",
        iconColor: "text-white",
        progressColor: "bg-amber-300",
      },
      info: {
        icon: Info,
        bgColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
        textColor: "text-white",
        borderColor: "border-blue-400",
        iconColor: "text-white",
        progressColor: "bg-blue-300",
      },
      cart: {
        icon: ShoppingBag,
        bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
        textColor: "text-white",
        borderColor: "border-purple-400",
        iconColor: "text-white",
        progressColor: "bg-purple-300",
      },
      wishlist: {
        icon: Heart,
        bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
        textColor: "text-white",
        borderColor: "border-pink-400",
        iconColor: "text-white",
        progressColor: "bg-pink-300",
      },
    };
    return config[type];
  };

  return (
    <ToastContext.Provider value={{ 
      showToast, 
      showSuccess, 
      showError, 
      showWarning, 
      showInfo,
      showCart,
      showWishlist
    }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 flex flex-col gap-3 z-[100] max-w-sm w-full">
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type);
          const Icon = config.icon;
          
          return (
            <div
              key={toast.id}
              className={`
                relative overflow-hidden rounded-xl shadow-2xl border backdrop-blur-sm
                transform transition-all duration-500 animate-in slide-in-from-right-full
                ${config.bgColor} ${config.borderColor} ${config.textColor}
                hover:scale-[1.02] hover:shadow-2xl cursor-pointer
              `}
              onClick={() => removeToast(toast.id)}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-black/10">
                <div
                  className={`h-full ${config.progressColor} transition-all duration-300 ease-linear`}
                  style={{
                    animation: `shrink ${toast.duration}ms linear forwards`
                  }}
                />
              </div>

              {/* Toast Content */}
              <div className="p-4 flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeToast(toast.id);
                  }}
                  className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full animate-shine" />
            </div>
          );
        })}
      </div>

      {/* Add these styles to your global CSS */}
      <style jsx global>{`
        @keyframes slide-in-from-right-full {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}