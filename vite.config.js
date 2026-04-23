import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxy requests from /api/waitlist to the Google Apps Script endpoint during development
			"/api/waitlist": {
				target: "https://script.google.com",
				changeOrigin: true,
				secure: true,
				rewrite: (path) =>
					path.replace(
						/^\/api\/waitlist/,
						"/macros/s/AKfycbxwycDlYCsUsTYwyvDuBT_qRBsfQjh1xHNyyUPefcmeaElpTx1sKbgLAqFVzrjqHTwb/exec",
					),
			},
		},
	},
});
