const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Could not connect to the backend. Start the backend server and try again.",
    );
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`The backend returned an invalid response (${response.status}).`);
  }

  if (!response.ok) {
    const detail = result.detail;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg).join(" ")
      : detail;
    throw new Error(message || `Request failed (${response.status}).`);
  }

  return result;
}

export { API_BASE_URL };
