import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-white rounded-2xl p-4 border shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'error'
              ? 'border-rose-200 text-rose-950'
              : toast.type === 'warning'
              ? 'border-amber-200 text-amber-950'
              : 'border-[#063D30]/15 text-[#17231E]'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-500" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#063D30]" />
            )}
          </div>

          <div className="flex-1">
            <h5 className="font-semibold text-xs text-[#063D30]">{toast.title}</h5>
            <p className="text-[11px] text-[#6D746E] mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
