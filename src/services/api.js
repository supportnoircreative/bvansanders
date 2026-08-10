const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // Keep the status fallback when the body isn't JSON.
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (path, options) => request(path, { method: "GET", ...options }),
  post: (path, body, options) =>
    request(path, { method: "POST", body, ...options }),
  put: (path, body, options) =>
    request(path, { method: "PUT", body, ...options }),
  patch: (path, body, options) =>
    request(path, { method: "PATCH", body, ...options }),
  delete: (path, options) => request(path, { method: "DELETE", ...options }),
};

export default api;