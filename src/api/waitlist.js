// Simple API helper for the Google Apps Script endpoint with retries
export async function joinWaitlist(url, email) {
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ email }),
	});

	const text = await res.text();

	if (text === "success") {
		return { success: true };
	}

   if (text === "exists") {
		return { success: false, error: "You're already on the waitlist" };
	}

	if (text === "invalid") {
		return { success: false, error: "Invalid email address" };
	}

	return { success: false, error: "Server error" };
}
