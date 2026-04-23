import React, { useState } from "react";
import useToast from "../hooks/useToast";
import { joinWaitlist } from "../api/waitlist";

// Props: endpoint (string) - Google Apps Script URL. Falls back to env var.
export default function WaitlistForm({ id, endpoint }) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	// Resolve endpoint safely: prop -> Vite import.meta.env -> window fallback -> dev proxy
	let viteEnv;
	try {
		viteEnv = import.meta?.env?.VITE_WAITLIST_ENDPOINT;
	} catch (e) {
		viteEnv = undefined;
	}

	const isDev =
		typeof import.meta !== "undefined" ? import.meta.env?.DEV : false;
	const windowFallback =
		typeof window !== "undefined" ? window.__WAITLIST_ENDPOINT__ : undefined;
	const apiEndpoint =
		endpoint || viteEnv || windowFallback || (isDev ? "/api/waitlist" : "");

	async function handleSubmit(e) {
		e.preventDefault();
		if (loading) return; // prevent duplicate submissions

		if (!apiEndpoint) {
			toast.error(
				"Waitlist endpoint not configured. Set VITE_WAITLIST_ENDPOINT or pass `endpoint` prop.",
			);
			return;
		}

		const value = (email || "").trim();
		if (!value || !value.includes("@")) {
			toast.error("Please enter a valid email address");
			return;
		}

		setLoading(true);
		const loadingId = toast.loading("Joining...");

		try {
			const result = await joinWaitlist(apiEndpoint, value);

			toast.dismiss(loadingId);

			if (result.success) {
				toast.success("You're on the waitlist 🎉");
				setEmail("");
			} else {
				toast.error(result.error || "Failed to join waitlist");
			}
		} catch (err) {
			toast.dismiss(loadingId);
			toast.error(err?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			id={id}
			onSubmit={handleSubmit}
			className="form-wrapper"
			aria-label="Waitlist signup form">
			<div className="form">
				<label htmlFor="email" className="sr-only">
					Email address
				</label>
				<input
					id="email"
					type="email"
					required
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
					placeholder="Enter your email"
					autoComplete="email"
					className="form-input"
				/>
				<button
					type="submit"
					className="form-button"
					disabled={loading}
					aria-busy={loading}>
					{loading ? "Joining…" : "Join waitlist"}
				</button>
			</div>
		</form>
	);
}
