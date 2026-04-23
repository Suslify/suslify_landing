/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#10b981",
					dark: "#059669",
					soft: "#d1fae5",
				},
			},
			boxShadow: {
				card: "0 12px 30px rgba(15, 23, 42, 0.08)",
			},
		},
	},
	plugins: [],
};
