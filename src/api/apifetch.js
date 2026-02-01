const base_url = process.env.API_URL;

async function apifetch(endpoint, options = {}) {
  const response = await fetch(base_url + endpoint, {
    credentials: "include", // ✅ sends cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Api request failed");
  }

  return data;
}

export default apifetch;
