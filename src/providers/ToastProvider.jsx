import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

function genId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	const dismiss = useCallback((id) => {
		setToasts((t) => t.filter((x) => x.id !== id));
	}, []);

	const show = useCallback(({ type = "info", message, duration = 3500 }) => {
		const id = genId();
		setToasts((t) => [{ id, type, message }, ...t]);

		if (duration && duration > 0) {
			setTimeout(() => {
				setToasts((t) => t.filter((x) => x.id !== id));
			}, duration);
		}

		return id;
	}, []);

	const api = {
		show,
		dismiss,
		success: (msg, opts = {}) =>
			show({
				type: "success",
				message: msg,
				duration: opts.duration ?? 3500,
			}),
		error: (msg, opts = {}) =>
			show({ type: "error", message: msg, duration: opts.duration ?? 4000 }),
		loading: (msg = "Loading...") =>
			show({ type: "loading", message: msg, duration: null }),
	};

	return (
		<ToastContext.Provider value={api}>
			{children}
			<div className="toast-root" aria-live="polite" aria-atomic="true">
				{toasts.map((t) => (
					<div
						key={t.id}
						className={`toast toast-${t.type}`}
						role="status">
						<div className="toast-content">
							<div className="toast-message">{t.message}</div>
							<button
								className="toast-close"
								aria-label="Dismiss"
								onClick={() => dismiss(t.id)}>
								×
							</button>
						</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	const ctx = useContext(ToastContext);
	if (!ctx)
		throw new Error("useToastContext must be used within ToastProvider");
	return ctx;
}

export default ToastProvider;
