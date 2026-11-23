import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {}
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, type, title, description }]);
      window.setTimeout(() => dismiss(id), 6500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-full max-w-md flex-col gap-3 px-4 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-[#0F2340] p-4 text-white shadow-xl ${
              t.type === 'success' ? 'border-[#1E3A5F]' : 'border-[#E8601C]'
            }`}
          >
            {t.type === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F0A32E]" aria-hidden="true" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#F0A32E]" aria-hidden="true" />
            )}
            <div className="flex-1">
              <p className="text-[15px] leading-[22px] font-semibold">{t.title}</p>
              {t.description && (
                <p className="mt-1 text-[14px] leading-[20px] text-slate-200">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="rounded p-1 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  return useContext(ToastContext);
}
